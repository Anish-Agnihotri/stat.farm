import axios from 'axios'

export default (req, res) => {
  return new Promise(resolve => {
    axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=compound-governance-token").then(cg => {
      axios.get("https://api.compound.finance/api/v2/governance/comp?network=mainnet").then(comp => {
        axios.get("https://api.coingecko.com/api/v3/coins/compound-governance-token/tickers").then(cgtickers => {
          let response = {
            "current_price": cg.data[0].current_price,
            "total_supply": cg.data[0].total_supply,
            "total_comp_distributed": parseInt(comp.data.total_comp_allocated),
            "total_volume": cg.data[0].total_volume,
            "tickers": cgtickers.data.tickers
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
}
