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
import useSWR from 'swr'
import fetch from 'unfetch'

const fetcher = url => fetch(url).then(r => r.json())

export default function Compound() {
  const { data, error } = useSWR('/api/compound', fetcher, { refreshInterval: 2000 });

  if (!data) return (
    <div>
      <Layout>
        <span>Loading...</span>
      </Layout>
    </div>
  )

  return (
    <div className="container">
      <Head>
        <title>StatFarm | Compound</title>
      </Head>
      <Layout>
        <p className="data-retrieved"><div className="status-light"></div> Data retrieved in real-time.</p>
        <div>
          <SmallCard name="COMP Price" content={"$" + data.current_price} />
          <SmallCard name="Market Cap (Fully diluted)" content={"$" + (data.current_price * data.total_supply).toLocaleString()} />
          <SmallCard name="COMP Dispensed (of 4.2M)" content={data.total_comp_distributed.toLocaleString()} />
          <SmallCard name="24H Volume (Cleaned)" content={"$" + data.total_volume.toLocaleString()}/>
        </div>
        <div>
          <WideCard name="COMP/USD"/>
          <MidCard name="COMP Market Volumes">
            {data.tickers.map((ticker, i) => {
              return <TickerItem key={i} ticker={ticker} />
            })}
          </MidCard>
        </div>
        <div>
          <SmallCard name="Compound Supply" content={"TODO"} />
          <SmallCard name="Compound Borrow" content={"TODO"} />
          <SmallCard name="Annual Interest Received" content={"TODO"} />
          <SmallCard name="Annual Interest Paid" content={"TODO"}/>
        </div>
        <XWideCard name="COMP Distribution Calculator">
          <COMPDistributionCalculator />
        </XWideCard>
        <div>
          <MidCard name="Adresses by Voting Weight">
            {data.addresses.map((address, i) => {
              return <AddressItem key={i} price={data.current_price} address={address} />
            })}
          </MidCard>
          <WideCard name="Governance Proposals">
            {data.proposals.map((proposal, i) => {
              return <GovernanceItem key={i} proposal={proposal} />
            })}
          </WideCard>
        </div>
      </Layout>
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