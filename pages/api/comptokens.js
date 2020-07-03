import axios from 'axios'

export default (req, res) => {
    return new Promise(resolve => {
        axios.get("https://api.compound.finance/api/v2/ctoken?meta=true&network=mainnet").then(ctokens => {
            
            let tokens = ctokens.data.cToken;
            let data = [];

            tokens.forEach(token => {
                let tokenItem = {
                    "image": `https://compound.finance/images/asset_${token.underlying_symbol === 'WBTC' ? 'BTC' : token.underlying_symbol}.svg`,
                    "name": token.name === 'Compound USDT' ? "Tether" : token.name.slice(9),
                    "symbol": token.symbol.slice(1),
                };

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
}