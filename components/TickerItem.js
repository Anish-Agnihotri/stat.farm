export default function TickerItem(props) {
    return(
        <>
            <a href={props.ticker.trade_url} target="_blank" rel="noopener noreferrer" className="tickeritem">
                <img src={props.ticker.market.logo} alt={`${props.ticker.market.name} logo`} />
                <span><strong>{props.ticker.market.name}</strong> ({props.ticker.target})</span>
                <span className="vol">${(props.ticker.converted_volume.usd).toLocaleString()}</span>
            </a>
            <style jsx>{`
            .tickeritem {
                width: calc(100% - 40px);
                display: inline-block;
                padding: 10px 20px;
                text-decoration: none;
                border-bottom: 1px solid #f1f1f3;
                color: #000;
                font-size: 15px;
                transition: 50ms ease-in-out;
                position: relative;
            }
            .tickeritem:nth-of-type(2n) {
                background-color: #FDFDFD;
            }
            .tickeritem:hover {
                background-color: #fde7e7;
            }
            .tickeritem > img {
                height: 30px;
                width: 30px;
                border-radius: 50%;
                margin-right: 10px;
            }
            .tickeritem > span:nth-of-type(1) {
                vertical-align: top;
                display: inline-block;
                transform: translateY(8px);
            }
            .vol {
                display: inline-block;
                top: 17.5px;
                right: 15px;
                position: absolute;
                font-weight: 500;
                font-size: 15px;
                background-color: #EFEFF1;
                padding: 2px 5px;
                border-radius: 5px;
            }
            `}</style>
        </>
    )
}