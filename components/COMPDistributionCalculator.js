import ReactTable from 'react-table-6'
import useSWR from 'swr'
import fetch from 'unfetch'

const fetcher = url => fetch(url).then(r => r.json())

export default function COMPDistributionCalculator() {
    const { data, error } = useSWR('/api/comptokens', fetcher);
    
    const columns = [
        {Header: 'Market', Accessor: 'image', Cell: row => <MarketItem {...row.original} />},
        {Header: 'Gross Supply', Accessor: 'gross_supply', Cell: row => <FormatItem {...row.original} type="supply" />},
        {Header: 'Supply APY', Accessor: 'supply_apy', Cell: row => <FormatItemAPY {...row.original} type="supply" />},
        {Header: 'Gross Borrow', Accessor: 'gross_borrow', Cell: row => <FormatItem {...row.original} />},
        {Header: 'Borrow APY', Accessor: 'borrow_apy', Cell: row => <FormatItemAPY {...row.original} />},
    ];

    if (!data) return <p>Loading...</p>

    return (
        <>
            <ReactTable
                data={data}
                columns={columns} 
                showPagination={false}
                defaultPageSize={data.length}
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
        <div>
            <span>{props.type === 'supply' ? props.gross_supply : props.gross_borrow}</span>
            <span></span>
        </div>
    )
}

function FormatItemAPY(props) {
    return(
        <div>
            <span>Test</span>
            <span>Test</span>
        </div>
    )
}