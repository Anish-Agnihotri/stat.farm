import ReactTable from 'react-table-6'

export default function COMPDistributionCalculator(props) {
    const columns = [
        {Header: 'Market', Accessor: 'image', Cell: row => <MarketItem {...row.original} />},
        {Header: 'Gross Supply', Accessor: 'gross_supply', Cell: row => <FormatItem {...row.original} type="supply" />},
        {Header: 'Supply APY', Accessor: 'supply_apy', Cell: row => <FormatItemAPY {...row.original} type="supply" />},
        {Header: '$ Supplied', Accessor: 'gross_supply', Cell: row => <CalcCell {...row.original} />},
        {Header: 'Gross Borrow', Accessor: 'gross_borrow', Cell: row => <FormatItem {...row.original} />},
        {Header: 'Borrow APY', Accessor: 'borrow_apy', Cell: row => <FormatItemAPY {...row.original} />},
        {Header: '$ Borrowed', Accessor: 'gross_borrow', Cell: row => <CalcCell {...row.original} />},
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
            <style global jsx>{`
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
            .rt-tbody > div:last-of-type > .rt-tr {
                border-bottom: none;
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
            `}</style>
        </>
    )
}

function MarketItem(props) {
    return(
        <>
            <div className="marketItem">
                <div>
                    <img src={props.image} />
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
    return (
        <>
            <div className="calc">
                <input type="number" placeholder={`${props.symbol} (USD) value`}/>
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