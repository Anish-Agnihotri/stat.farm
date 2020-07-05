import axios from 'axios'

/*
    /api/compound/info
    Returns general data about COMP token
    and market volumes
*/

export default (req, res) => {
    return new Promise(resolve => {
        // Pull COMP price
        axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=compound-governance-token").then(cg => {
            // PUll COMP dispensed info
            axios.get("https://api.compound.finance/api/v2/governance/comp?network=mainnet").then(comp => {
                // Pull COMP exchange volumes
                axios.get("https://api.coingecko.com/api/v3/coins/compound-governance-token/tickers?include_exchange_logo=true").then(cgtickers => {
                    let tickers = cgtickers.data.tickers; // Collect exchanges
                    let sorted = tickers.sort(function(a, b) {return b.converted_volume.usd - a.converted_volume.usd}); // Sort exchanges by volume
                    let cleaned = []; // Setup cleaned array
                    let total_volume = 0; // Setup total volume value

                    // Loop through exchanges
                    for (let i = 0; i < sorted.length; i++) {
                        // Select only exchanges with green trust score
                        if (sorted[i].trust_score === 'green') {
                            cleaned.push(sorted[i]); // Push exchange info to cleaned array
                            total_volume += sorted[i].converted_volume.usd; // Increment total volume
                        }
                    }

                    // Return response JSON object
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
