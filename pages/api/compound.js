import axios from 'axios'

export default (req, res) => {
  return new Promise(resolve => {
    axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=compound-governance-token").then(cg => {
      axios.get("https://api.compound.finance/api/v2/governance/comp?network=mainnet").then(comp => {
        axios.get("https://api.coingecko.com/api/v3/coins/compound-governance-token/tickers?include_exchange_logo=true").then(cgtickers => {
          axios.get("https://api.compound.finance/api/v2/governance/accounts?page_size=100&page_number=1&with_history=false&network=mainnet").then(compaddr => {
            let tickers = cgtickers.data.tickers;
            let sorted = tickers.sort(function(a, b) {return b.converted_volume.usd - a.converted_volume.usd});
            let cleaned = [];
            let total_volume = 0;
  
            for (let i = 0; i < sorted.length; i++) {
              if (sorted[i].trust_score === 'green') {
                cleaned.push(sorted[i]);
                total_volume += sorted[i].converted_volume.usd;
              }
            }

            let comp_holders = compaddr.data.accounts;
            for (let i = 0; i < comp_holders.length; i++) {
              if (comp_holders[i].display_name === 'Can Not Lose') {
                comp_holders[i].image_url = '';
              }
            }
  
            let response = {
              "time": Date.now(),
              "current_price": cg.data[0].current_price,
              "total_supply": cg.data[0].total_supply,
              "total_comp_distributed": parseInt(comp.data.total_comp_allocated),
              "total_volume": total_volume,
              "tickers": cleaned,
              "addresses": compaddr.data.accounts
            }
            
            res.send(response);
            res.status(200).end();
            resolve();
          }).catch(() => {
            res.status(405).end();
            resolve();
          })
        })
      })
    })
  })
}
