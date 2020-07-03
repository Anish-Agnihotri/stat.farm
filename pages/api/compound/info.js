import axios from 'axios'

export default (req, res) => {
    return new Promise(resolve => {
        axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=compound-governance-token").then(cg => {
            axios.get("https://api.compound.finance/api/v2/governance/comp?network=mainnet").then(comp => {
                axios.get("https://api.coingecko.com/api/v3/coins/compound-governance-token/tickers?include_exchange_logo=true").then(cgtickers => {
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

                    let response = {
                        "current_price": cg.data[0].current_price,
                        "total_supply": cg.data[0].total_supply,
                        "total_comp_distributed": parseInt(comp.data.total_comp_allocated),
                        "total_volume": total_volume,
                        "tickers": cleaned,
                    }

                    res.send(response);
                    res.status(200).end();
                    resolve();
                })
            })
        })
    })
}
