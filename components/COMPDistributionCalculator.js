import ReactTable from 'react-table-6'
import {useState, useEffect} from 'react'

export default function COMPDistributionCalculator(props) {
    const [distribution, setDistribution] = useState({
        "supply": {
            'DAI': 0,
            'USDC': 0,
            'ETH': 0,
            'USDT': 0,
            'ZRX': 0,
            'REP': 0,
            'BAT': 0,
            'WBTC': 0,
            'SAI': 0
        },
        "borrow": {
            'DAI': 0,
            'USDC': 0,
            'ETH': 0,
            'USDT': 0,
            'ZRX': 0,
            'REP': 0,
            'BAT': 0,
            'WBTC': 0,
            'SAI': 0
        }});

    useEffect(() => calculateValues(), [distribution]);

    const [interest_earned, set_interest_earned] = useState(0);
    const [interest_paid, set_interest_paid] = useState(0);
    const [comp_earned, set_comp_earned] = useState(0);
    const [comp_earned_usd, set_comp_earned_usd] = useState(0);
    const [net_earnings, set_net_earnings] = useState(0);
    const [net_apy, set_net_apy] = useState(0);

    function updateDistribution(type, symbol, value) {
        let opposite = {...distribution[type === 'supply' ? 'borrow' : 'supply']};
        let existing = {...distribution[type === 'supply' ? 'supply' : 'borrow']}
        
        setDistribution({
            [type === 'supply' ? 'borrow' : 'supply']: {
                ...opposite
            },
            [type === 'supply' ? 'supply' : 'borrow']: {
                ...existing,
                [symbol]: isNaN(value) ? 0 : value
            }
        });

        calculateValues();
    }

    function calculateValues() {
        let comp_earned = 0;
        let int_earned = 0;
        let int_paid = 0;
        let sum_amount = 0;

        for (var key in distribution.supply) {
            if (parseFloat(distribution.supply[key]) > 0) {
                for (let i = 0; i < props.data.length; i++) {
                    if (props.data[i].symbol === key) {
                        int_earned += parseFloat(distribution.supply[key]) * (parseFloat(props.data[i].supply_apy) / 100);
                        comp_earned += (parseFloat(distribution.supply[key]) / props.data[i].gross_supply) * props.data[i].comp_allocation;
                        sum_amount += parseFloat(distribution.supply[key]);
                    }
                }
            }
        }

        for (var key in distribution.borrow) {
            if (parseFloat(distribution.borrow[key]) > 0) {
                for (let i = 0; i < props.data.length; i++) {
                    if (props.data[i].symbol === key) {
                        int_paid += parseFloat(distribution.borrow[key]) * (parseFloat(props.data[i].borrow_apy) / 100);
                        comp_earned += (parseFloat(distribution.borrow[key]) / props.data[i].gross_borrow) * props.data[i].comp_allocation;
                        sum_amount += parseFloat(distribution.borrow[key]);
                    }
                }
            }
        }

        let net_earnings = (comp_earned * props.price) + int_earned - int_paid;

        set_comp_earned(Number(comp_earned.toFixed(2)));
        set_comp_earned_usd(Number((comp_earned * props.price).toFixed(2)));
        set_interest_earned(Number(int_earned.toFixed(2)));
        set_interest_paid(Number(int_paid.toFixed(2)));
        set_net_earnings(Number(net_earnings.toFixed(2)));
        set_net_apy(((net_earnings / sum_amount) * 100).toFixed(2));
    }

    const columns = [
        {Header: 'Market', Accessor: 'image', Cell: row => <MarketItem {...row.original} />},
        {Header: 'Gross Supply', Accessor: 'gross_supply', Cell: row => <FormatItem {...row.original} type="supply" />},
        {Header: 'Supply APY', Accessor: 'supply_apy', Cell: row => <FormatItemAPY {...row.original} type="supply" />},
        {Header: '$ Supplied', Accessor: 'gross_supply', Cell: row => <CalcCell {...row.original} type="supply" updateDistribution={updateDistribution} distribution={distribution}/>},
        {Header: 'Gross Borrow', Accessor: 'gross_borrow', Cell: row => <FormatItem {...row.original} />},
        {Header: 'Borrow APY', Accessor: 'borrow_apy', Cell: row => <FormatItemAPY {...row.original} />},
        {Header: '$ Borrowed', Accessor: 'gross_borrow', Cell: row => <CalcCell {...row.original} updateDistribution={updateDistribution} distribution={distribution} />},
    ];

    return (
        <>
            <ReactTable
                data={props.data}
                columns={columns} 
                showPagination={false}
                defaultPageSize={props.data.length}
                resizable={false}
                className="comp-table"
            />
            <div className="token-distribution">
                <span>Calculated token distribution</span>
                <br />
                <br />
                <div>
                    <label htmlFor="comp-earned">COMP Earned</label>
                    <input id="comp-earned" value={comp_earned.toLocaleString()} placeholder="0" readOnly/>
                </div>
                <div>
                    <label htmlFor="comp-earned-usd">COMP Earned (USD)</label>
                    <input id="comp-earned-usd" value={"$" + comp_earned_usd.toLocaleString()} placeholder="$0" readOnly/>
                </div>
                <div>
                    <label htmlFor="interest-earned">Interest Earned</label>
                    <input id="interest-earned" value={"$" + interest_earned.toLocaleString()} placeholder="$0" readOnly/>
                </div>
                <div>
                    <label htmlFor="interest-paid">Interest Paid</label>
                    <input id="interest-paid" value={"$" + interest_paid.toLocaleString()} placeholder="$0" readOnly/>
                </div>
                <div>
                    <label htmlFor="net-earnings">Net Earnings</label>
                    <input id="net-earnings" value={"$" + net_earnings.toLocaleString()} placeholder="$0" readOnly/>
                </div>
                <div>
                    <label htmlFor="net-apy">Net APY</label>
                    <input id="net-apy" value={isNaN(net_apy) ? '0%' : net_apy.toLocaleString() + "%"} placeholder="0%" readOnly/>
                </div>
            </div>
            <style global jsx>{`
            .token-distribution {
                width: calc(100% - 80px);
                margin: 20px;
                padding: 20px;
                background-color: rgba(214, 2, 44, 0.1);
                border: 1px solid rgb(214, 2, 44);
                border-radius: 5px;
                text-align: center;
            }
            .token-distribution > span {
                font-weight: bold;
                text-decoration: underline;
            }
            .token-distribution > div {
                display: inline-block;
                padding: 5px;
            }
            .token-distribution > div > label {
                display: block;
            }
            .token-distribution > div > input {
                display: block;
                height: 30px;
                margin-top: 5px;
                border: 1px solid #ccc;
                border-radius: 5px;
                text-align: center;
                font-size: 17px;
                width: 160px;
            }
            .-header {
                height: 30px;
                border-bottom: 1px solid #e7eaf3;
                box-shadow: none !important;
            }
            .-header > .rt-tr {
                font-size: 13px;
                font-weight: bold;
                color: #AAB8C1;
                line-height: 30px;
            }
            .rt-tbody, .rt-thead {
                min-width: 1055px !important;
            }
            .-header > .rt-tr > .rt-th:nth-of-type(1) > div {
                padding-left: 25px;
            }
            .-loading {
                display: none;
            }
            .-even {
                background-color: #FDFDFD;
            }
            .rt-th {
                text-align: left;
            }
            .rt-th, .rt-td {
                border-right: none !important;
            }
            .rt-td {
                border-bottom: none;
            }
            .rt-tr > .rt-th:nth-of-type(1), .rt-tr > .rt-td:nth-of-type(1) {
                width: 275px !important;
            }
            .rt-tr > .rt-th:nth-of-type(2), .rt-tr > .rt-td:nth-of-type(2) {
                width: 100px !important;
            }
            .rt-tr > .rt-th:nth-of-type(3), .rt-tr > .rt-td:nth-of-type(3) {
                width: 90px !important;
            }
            .rt-tr > .rt-th:nth-of-type(4), .rt-tr > .rt-td:nth-of-type(4) {
                width: 200px !important;
            }
            .rt-tr > .rt-th:nth-of-type(5), .rt-tr > .rt-td:nth-of-type(5) {
                width: 100px !important;
            }
            .rt-tr > .rt-th:nth-of-type(6), .rt-tr > .rt-td:nth-of-type(6) {
                width: 90px !important;
            }
            .rt-tr > .rt-th:nth-of-type(7), .rt-tr > .rt-td:nth-of-type(7) {
                width: 200px !important;
            }
            .rt-tr > .rt-td {
                padding: 0px;
            }
            .comp-table {
                border: none;
            }
            .ReactTable .rt-tbody .rt-tr-group:last-child {
                border-bottom: 1px solid rgba(0,0,0,.05);
            }
            `}</style>
        </>
    )
}

function MarketItem(props) {
    return(
        <>
            <div className="marketItem">
                <div>
                    <img src={props.image} alt={`${props.symbol} logo`} />
                </div>
                <div>
                    <span>{props.name}</span>
                    <br />
                    <span>{props.symbol}</span>
                </div>
            </div>
            <style jsx>{`
            .marketItem {
                display: inline-block;
                height: 70px;
                width: 270px;
            }
            .marketItem > div {
                display: inline-block;
                height: 100%;
            }
            .marketItem > div:nth-child(1) {
                width: 80px;
                vertical-align: top;
            }
            .marketItem > div:nth-child(2) {
                width: 190px;
                vertical-align: top;
            }
            .marketItem > div > img {
                height: 43.5px;
                width: 43.5px;
                transform: translate(18.25px, 13.25px);
            }
            .marketItem > div > span {
                display: inline-block;
                transform: translateY(19px);
            }
            .marketItem > div > span:nth-of-type(1) {
                font-weight: bold;
            }
            .marketItem > div > span:nth-of-type(2) {
                color: #ACBBC2;
                font-size: 14px;
            }
            `}</style>
        </>
    )
}

function FormatItem(props) {
    return(
        <>
            <div className="format-item">
                <span>${props.type === 'supply' ? formatNum(props.gross_supply) : formatNum(props.gross_borrow)}</span>
                <br />
                {props.type === 'supply' ? (
                    props.gross_supply_change > 0 ? (
                        <span className="change-up">+{props.gross_supply_change.toFixed(2)}%</span>
                    ) : (
                        <span className="change-down">{props.gross_supply_change.toFixed(2)}%</span>
                    )
                ) : (
                    props.gross_borrow_change > 0 ? (
                        <span className="change-up">+{props.gross_borrow_change.toFixed(2)}%</span>
                    ) : (
                        <span className="change-down">{props.gross_borrow_change.toFixed(2)}%</span>
                    )
                )}
            </div>
            <style jsx>{`
            .format-item {
                height: 70px;
            }
            .format-item > span {
                display: inline-block;
                transform: translateY(18px);
            }
            .format-item > span:nth-of-type(1) {
                font-weight: 500;
            }
            .change-up {
                color: rgb(0, 190, 0);
                font-size: 14px;
            }
            .change-down {
                color: rgb(214, 2, 44);
                font-size: 14px;
            }
            `}</style> 
        </>
    )
}

function FormatItemAPY(props) {
    return(
        <>
            <div className="format-item">
                <span>{props.type === 'supply' ? props.supply_apy : props.borrow_apy}%</span>
                <br />
                {props.type === 'supply' ? (
                    props.supply_apy_change > 0 ? (
                        <span className="change-up">+{props.supply_apy_change.toFixed(2)}</span>
                    ) : (
                        <span className="change-down">{props.supply_apy_change.toFixed(2)}</span>
                    )
                ) : (
                    props.borrow_apy_change > 0 ? (
                        <span className="change-up">+{props.borrow_apy_change.toFixed(2)}</span>
                    ) : (
                        <span className="change-down">{props.borrow_apy_change.toFixed(2)}</span>
                    )
                )}
            </div>
            <style jsx>{`
            .format-item {
                height: 70px;
            }
            .format-item > span {
                display: inline-block;
                transform: translateY(18px);
            }
            .format-item > span:nth-of-type(1) {
                font-weight: 500;
            }
            .change-up {
                color: rgb(0, 190, 0);
                font-size: 14px;
            }
            .change-down {
                color: rgb(214, 2, 44);
                font-size: 14px;
            }
            `}</style> 
        </>
    )
}

function formatNum(value) {
    if (value > 1000000) {
        return (value / 1000000).toFixed(2) + 'M';
    } else if (value > 1000) {
        return (value / 1000).toFixed(0) + 'K';
    }
}

function CalcCell(props) {
    function updateNum(value) {
        props.updateDistribution(props.type === 'supply' ? 'supply' : 'borrow', props.symbol, parseFloat(value));
    }

    return (
        <>
            <div className="calc">
                <input type="number" step="any" value={props.distribution[props.type === 'supply' ? 'supply' : 'borrow'][props.symbol]} placeholder={`${props.symbol} (USD) value`} min="0" onChange={e => updateNum(e.target.value)} />
            </div>
            <style jsx>{`
            .calc > input {
                border: 1px solid #e7eaf3;
                border-radius: 5px;
                height: 30px;
                transform: translateY(20px);
                padding-left: 5px;
            }
            `}</style>
        </>
    )
}