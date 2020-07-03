import ReactTable from 'react-table-6'
import useSWR from 'swr'
import fetch from 'unfetch'

const fetcher = url => fetch(url).then(r => r.json())

export default function COMPDistributionCalculator() {
    const { data, error } = useSWR('/api/comptokens', fetcher);
    
    const columns = [
        {Header: 'Market', Accessor: 'image', Cell: row => <MarketItem {...row.original} />},
    ];

    if (!data) return <p>Loading...</p>

    return (
        <>
            <ReactTable
                data={data}
                columns={columns} 
                showPagination={false}
                defaultPageSize={data.length}
                className="comp-table"
            />
            <style global jsx>{`
            .-header {
                height: 30px;
                border-bottom: 1px solid #e7eaf3;
            }
            .-header > .rt-tr {
                font-size: 13px;
                font-weight: bold;
                color: #AAB8C1;
                line-height: 30px;
            }
            .rt-tbody > div > .rt-tr {
                border-bottom: 1px solid rgba(0, 0, 0, 0.05);
            }
            .rt-tbody > div:last-of-type > .rt-tr {
                border-bottom: none;
            }
            .-header > .rt-tr:nth-of-type(1) {
                padding-left: 25px;
            }
            .-loading {
                display: none;
            }
            .-even {
                background-color: #FDFDFD;
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
                    <span>{props.symbol}</span>
                </div>
            </div>
            <style jsx>{`
            .marketItem {
                display: inline-block;
                height: 70px;
                width: 275px;
            }
            .marketItem > div {
                display: inline-block;
                height: 100%;
            }
            .marketItem > div:nth-child(1) {
                width: 50px;
                padding-left: 25px;
                vertical-align: top;
            }
            .marketItem > div:nth-child(2) {
                width: 190px;
                padding-left: 10px;
                vertical-align: top;
            }
            .marketItem > div > img {
                height: 43.5px;
                width: 43.5px;
                transform: translateY(13.25px);
            }
            .marketItem > div > span {
                display: inline-block;
                width: 100%;
                transform: translateY(19px);
            }
            .marketItem > div > span:nth-child(1) {
                font-weight: bold;
            }
            .marketItem > div > span:nth-child(2) {
                color: #ACBBC2;
                font-size: 14px;
            }
            `}</style>
        </>
    )
}