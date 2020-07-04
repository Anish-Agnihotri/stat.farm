import axios from 'axios'

export default (req, res) => {
    return new Promise(resolve => {
        axios.get("https://dev-api.shrimpy.io/v1/exchanges/coinbasepro/candles?quoteTradingSymbol=USD&baseTradingSymbol=COMP&interval=1H").then(response => {
            res.send(response.data);
            res.status(200).end();
            resolve();
        })
    })
}
