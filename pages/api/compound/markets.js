import axios from 'axios';

/*
    /api/compound/markets
    Returns data about compound finance pools
    including token data for today and historic
*/

export default (req, res) => {
    return new Promise(resolve => {
        // Get Compound Market data
        axios.get("https://api.compound.finance/api/v2/ctoken?meta=true&network=mainnet").then(ctokens => {
            // Get historic Compound Market data (to calculate 24H change)
            axios.get(`https://api.compound.finance/api/v2/ctoken?meta=false&block_timestamp=${parseInt((new Date().getTime() / 1000) - 86400)}&network=mainnet`).then(historic => {
                // Get CoinGecko eth price data
                axios.get("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd").then(eth => {
                    // Get CoinGecko COMP price and volume data
                    axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=compound-governance-token").then(comp => {
                        let tokens = ctokens.data.cToken; // Setup current token info
                        let historic_tokens = historic.data.cToken; // Setup historic token info
                        let eth_price = eth.data.ethereum.usd; // Setup eth price
                        let data = []; // Container for token data

                        // General statistics to calculate:
                        let total_supply = 0;
                        let total_borrow = 0;
                        let earned_interest = 0;
                        let paid_interest = 0;

                        // Setup token items from Compound data:
                        tokens.forEach(token => {
                            // Collect required stats for front-end
                            let tokenItem = {
                                "image": `https://compound.finance/images/asset_${token.underlying_symbol === 'WBTC' ? 'BTC' : token.underlying_symbol}.svg`,
                                "name": token.name === 'Compound USDT' ? "Tether" : token.name.slice(9),
                                "symbol": token.symbol.slice(1),
                                "borrow_apy": (token.borrow_rate.value * 100).toFixed(2),
                                "supply_apy": (token.supply_rate.value * 100).toFixed(2),
                                "gross_supply": parseFloat(token.total_supply.value) * ((parseFloat(token.exchange_rate.value) * parseFloat(token.underlying_price.value)) * eth_price),
                                "gross_borrow": parseFloat(token.total_borrows.value) * (parseFloat(token.underlying_price.value) * eth_price)
                            };
                            
                            // Increment total supply and borrow calculations
                            total_supply += tokenItem.gross_supply;
                            total_borrow += tokenItem.gross_borrow;
                            
                            // Calculate earned_interest for tokens with >0APY
                            if (token.supply_rate.value > 0) {
                                earned_interest += tokenItem.gross_supply * token.supply_rate.value;
                            }
                            if (token.borrow_rate.value > 0) {
                                paid_interest += tokenItem.gross_borrow * token.borrow_rate.value;
                            }

                            // Use historic compound data to calculate change in apy/supply/borrow
                            historic_tokens.forEach(historicToken => {
                                if (token.name === historicToken.name) {
                                    tokenItem.supply_apy_change = ((parseFloat(token.supply_rate.value) * 100) - (parseFloat(historicToken.supply_rate.value) * 100));
                                    tokenItem.borrow_apy_change = ((parseFloat(token.borrow_rate.value) * 100) - (parseFloat(historicToken.borrow_rate.value) * 100));
                                    tokenItem.gross_supply_change = ((tokenItem.gross_supply - (parseFloat(historicToken.total_supply.value) * ((parseFloat(historicToken.exchange_rate.value) * parseFloat(historicToken.underlying_price.value)) * eth_price))) / tokenItem.gross_supply) * 100;
                                    tokenItem.gross_borrow_change = ((tokenItem.gross_borrow - (parseFloat(historicToken.total_borrows.value) * (parseFloat(historicToken.underlying_price.value) * eth_price))) / tokenItem.gross_borrow) * 100;
                                }
                            })
                            
                            // Push token to data container
                            data.push(tokenItem);
                        })
                        
                        // Sort tokens by gross market supply (largest first)
                        let sorted = data.sort(function(a, b) {return b.gross_supply - a.gross_supply});

                        // Calculate yearly comp allocation per token
                        for (let i = 0; i < sorted.length; i++) {
                            let total_diff = ((sorted[i].gross_borrow / total_borrow) * 527425);
                            sorted[i].comp_allocation = total_diff;
                        }

                        res.send({
                            tokens: sorted,
                            total_supply,
                            total_borrow,
                            earned_interest,
                            paid_interest,
                            comp_price: comp.data[0].current_price
                        });
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