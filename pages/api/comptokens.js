import axios from 'axios'

export default (req, res) => {
    return new Promise(resolve => {
        axios.get("https://api.compound.finance/api/v2/ctoken?meta=true&network=mainnet").then(ctokens => {
            axios.get(`https://api.compound.finance/api/v2/ctoken?meta=false&block_timestamp=${parseInt((new Date().getTime() / 1000) - 86400)}&network=mainnet`).then(historic => {
                axios.get("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd").then(eth => {
                    let tokens = ctokens.data.cToken;
                    let historic_tokens = historic.data.cToken;
                    let eth_price = eth.data.ethereum.usd;
                    let data = [];
        
                    tokens.forEach(token => {
                        let tokenItem = {
                            "image": `https://compound.finance/images/asset_${token.underlying_symbol === 'WBTC' ? 'BTC' : token.underlying_symbol}.svg`,
                            "name": token.name === 'Compound USDT' ? "Tether" : token.name.slice(9),
                            "symbol": token.symbol.slice(1),
                            "borrow_apy": (token.borrow_rate.value * 100).toFixed(2),
                            "supply_apy": (token.supply_rate.value * 100).toFixed(2),
                            "gross_supply": parseFloat(token.total_supply.value) * ((parseFloat(token.exchange_rate.value) * parseFloat(token.underlying_price.value)) * eth_price),
                            "gross_borrow": parseFloat(token.total_borrows.value) * (parseFloat(token.underlying_price.value) * eth_price)
                        };

                        historic_tokens.forEach(historicToken => {
                            if (token.name === historicToken.name) {
                                tokenItem.supply_apy_change = ((parseFloat(token.supply_rate.value) * 100) - (parseFloat(historicToken.supply_rate.value) * 100));
                                tokenItem.borrow_apy_change = ((parseFloat(token.borrow_rate.value) * 100) - (parseFloat(historicToken.borrow_rate.value) * 100));
                                tokenItem.gross_supply_change = ((tokenItem.gross_supply - (parseFloat(historicToken.total_supply.value) * ((parseFloat(historicToken.exchange_rate.value) * parseFloat(historicToken.underlying_price.value)) * eth_price))) / tokenItem.gross_supply) * 100;
                                tokenItem.gross_borrow_change = ((tokenItem.gross_borrow - (parseFloat(historicToken.total_borrows.value) * (parseFloat(historicToken.underlying_price.value) * eth_price))) / tokenItem.gross_borrow) * 100;
                            }
                        })
        
                        data.push(tokenItem);
                    })
        
                    res.send(data);
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