import Head from 'next/head'
import Layout from '../components/Layout'
import SmallCard from '../components/SmallCard'
import WideCard from '../components/WideCard'
import MidCard from '../components/MidCard'
import XWideCard from '../components/XWideCard'
import TickerItem from '../components/TickerItem'
import AddressItem from '../components/AddressItem'
import GovernanceItem from '../components/GovernanceItem'
import COMPDistributionCalculator from '../components/COMPDistributionCalculator'
import BeatLoader from "react-spinners/BeatLoader"
import COMPChart from '../components/COMPChart'
import useSWR from 'swr'
import fetch from 'unfetch'

const fetcher = url => fetch(url).then(r => r.json())

export default function Compound() {
  const { data: data_info } = useSWR('/api/compound/info', fetcher, { refreshInterval: 2000 });
  const { data: data_markets } = useSWR('/api/compound/markets', fetcher, { refreshInterval: 5000 });
  const { data: data_governance } = useSWR('/api/compound/governance', fetcher, { refreshInterval: 20000 });
  const { data: data_candles } = useSWR("/api/compound/chart", fetcher);

  return (
    <div className="container">
      <Head>
        <title>StatFarm | Compound</title>
      </Head>
      <Layout>
        <div>
          <p className="data-retrieved"><span className="status-light"></span>Data retrieved in real-time.</p>
        </div>
        <div>
          <SmallCard name="COMP Price" content={data_info ? "$" + data_info.current_price : <CustomLoader />} />
          <SmallCard name="Market Cap (Fully diluted)" content={data_info ? "$" + (data_info.current_price * data_info.total_supply).toLocaleString() : <CustomLoader />} />
          <SmallCard name="COMP Dispensed (of 4.2M)" content={data_info ? data_info.total_comp_distributed.toLocaleString() : <CustomLoader />} />
          <SmallCard name="24H Volume (Cleaned)" content={data_info ? "$" + data_info.total_volume.toLocaleString() : <CustomLoader />}/>
        </div>
        <div>
          <WideCard name="COMP/USD (Coinbase)">
            {data_candles ? <COMPChart data={data_candles} /> : <CustomLoader />}
          </WideCard>
          <MidCard name="COMP Market Volumes">
            {data_info ? data_info.tickers.map((ticker, i) => {
              return <TickerItem key={i} ticker={ticker} />
            }) : (
              <div className="centerize">
                <CustomLoader />
              </div>
            )}
          </MidCard>
        </div>
        <div>
          <SmallCard name="Compound Supply" content={data_markets ? "$" + parseInt(data_markets.total_supply).toLocaleString() : <CustomLoader />} />
          <SmallCard name="Compound Borrow" content={data_markets ? "$" + parseInt(data_markets.total_borrow).toLocaleString() : <CustomLoader />} />
          <SmallCard name="Annual Interest Received" content={data_markets ? "$" + parseInt(data_markets.earned_interest).toLocaleString() : <CustomLoader />} />
          <SmallCard name="Annual Interest Paid" content={data_markets ? "$" + parseInt(data_markets.paid_interest).toLocaleString() : <CustomLoader />} />
        </div>
        <XWideCard name="COMP Distribution Calculator">
          {data_markets ? (
            <COMPDistributionCalculator data={data_markets.tokens} price={data_markets.comp_price} />
          ) : (
            <div className="centerize">
              <br />
              <p>Loading calculator...</p>
            </div>
          )}
        </XWideCard>
        <div>
          <MidCard name="Adresses by Voting Weight">
            {data_governance ? data_governance.addresses.map((address, i) => {
              return <AddressItem key={i} price={data_governance.current_price} address={address} />
            }) : (
              <div className="centerize">
                <CustomLoader />
              </div>
            )}
          </MidCard>
          <WideCard name="Governance Proposals">
            {data_governance ? data_governance.proposals.map((proposal, i) => {
              return <GovernanceItem key={i} proposal={proposal} />
            }) : (
              <div className="centerize">
                <CustomLoader />
              </div>
            )}
          </WideCard>
        </div>
      </Layout>
      <style global jsx>{`
      .centerize {
        width: 100%;
        height: 100%;
        text-align: center;
      }
      .centerize > div {
        transform: translateY(200px);
      }
      `}</style>
      <style jsx>{`
      .data-retrieved {
        display: inline-block;
        width: calc(100% - 55px);
        margin-block-end: 0px;
        background-color: #fff;
        height: 40px;
        border-radius: 5px;
        border: 1px solid #e7eaf3;
        box-shadow: 0 0 35px rgba(127,150,174,.125);
        line-height: 40px;
      }
      .status-light {
        height: 8px;
        width: 8px;
        display: inline-block;
        border-radius: 50%;
        transform: scale(1);
        vertical-align: middle;
        margin-right: 5px;
        margin-top: -2px;
        background-color: rgb(0, 190, 0);
        box-shadow: 0 0 0 0 rgba(0, 190, 0, 1);
        animation: pulsegreen 2s infinite;
      }
      @media screen and (max-width: 600px) {
        .data-retrieved {
          width: calc(100% - 40px);
        }
      }
      @keyframes pulsegreen {
        0% {
          transform: scale(0.95);
          box-shadow: 0 0 0 0 rgba(0, 190, 0, 0.7);
        }
      
        70% {
          transform: scale(1);
          box-shadow: 0 0 0 5px rgba(0, 190, 0, 0);
        }
      
        100% {
          transform: scale(0.95);
          box-shadow: 0 0 0 0 rgba(0, 190, 0, 0);
        }
      }
      `}</style>
    </div>
  )
}

function CustomLoader() {
  return <BeatLoader
    size={10}
    color={"#F01716"}
    loading={true}
  />
}