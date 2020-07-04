import moment from 'moment'

export default function GovernanceItem(props) {
    return(
        <>
            <a href={`https://compound.finance/governance/proposals/${props.proposal.id}`} target="_blank" rel="noopener noreferrer" className="governanceItem">
                <div>
                    {props.proposal.states[props.proposal.states.length - 1].state === 'active' ? (
                        <div className="status-light active"></div>
                    ) : 
                        (props.proposal.states[props.proposal.states.length - 1].state === 'executed' ? (
                            <div className="status-light executed"></div>
                        ) : (
                            <div className="status-light failed"></div>
                        ))
                    }
                </div>
                <div>
                    <span>{props.proposal.title}</span>
                    <span>Proposal {props.proposal.id} | <strong>{props.proposal.states[props.proposal.states.length - 1].state.charAt(0).toUpperCase() + props.proposal.states[props.proposal.states.length - 1].state.slice(1)}</strong> {moment.unix(props.proposal.states[props.proposal.states.length - 1].start_time).fromNow()}</span>
                </div>
                <div>
                    <div>
                        <label for="for">{parseInt(props.proposal.for_votes).toLocaleString()}</label>
                        <progress id="for" max="1" value={parseInt(props.proposal.for_votes) / (parseInt(props.proposal.against_votes) + parseInt(props.proposal.for_votes))}></progress>
                    </div>
                    <div>
                        <label for="against">{parseInt(props.proposal.against_votes).toLocaleString()}</label>
                        <progress id="against" max="1" value={parseInt(props.proposal.against_votes) / (parseInt(props.proposal.for_votes) + parseInt(props.proposal.against_votes))}></progress>
                    </div>
                </div>
            </a>
            <style jsx>{`
            .governanceItem {
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
            .governanceItem:nth-of-type(2n) {
                background-color: #FDFDFD;
            }
            .governanceItem:hover {
                background-color: #fde7e7;
            }
            .governanceItem > div:nth-child(1) {
                height: 100%;
                display: inline-block;
                width: 22px;
                vertical-align: top;
            }
            .governanceItem > div:nth-child(2) {
                height: 100%;
                display: inline-block;
                width: calc(100% - 272px);
                vertical-align: top;
            }
            .governanceItem > div:nth-child(2) > span:nth-child(1) {
                font-size: 15px;
                font-weight: bold;
                width: 100%;
                display: inline-block;
            }
            .governanceItem > div:nth-child(2) > span:nth-child(2) {
                color: #AAB8C1;
            }
            .governanceItem > div:nth-child(3) {
                height: 100%;
                display: inline-block;
                width: 250px;
                vertical-align: top;
                text-align: right;
            }
            .governanceItem > div:nth-child(3) > div > label {
                padding-right: 10px;
                font-size: 14px;
                vertical-align: middle;
            }
            .governanceItem > div:nth-child(3) > div > progress {
                height: 5px;
                vertical-align: middle;
                border-radius: 5px;
            }
            .governanceItem > div:nth-child(3) > div > progress::-webkit-progress-bar, .governanceItem > div:nth-child(3) > div > progress::-webkit-progress-bar-value {
                border-radius: 5px;
                background-color: #ccc;
            }
            .governanceItem > div:nth-child(3) > div:nth-child(1) > progress[value]::-webkit-progress-value {
                background-color: rgb(0, 190, 0);
            }
            .governanceItem > div:nth-child(3) > div:nth-child(2) > progress[value]::-webkit-progress-value {
                background-color: rgb(214, 2, 44);
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
            }
            .active {
                background-color: #C0C0C0;
                box-shadow: 0 0 0 0 rgba(192, 192, 192, 1);
                animation: pulsegray 2s infinite;
            }
            .executed {
                background-color: rgb(0, 190, 0);
                box-shadow: 0 0 0 0 rgba(0, 190, 0, 1);
            }
            .failed {
                background-color: rgb(214, 2, 44);
                box-shadow: 0 0 0 0 rgba(214, 2, 44, 1);
            }
            @media screen and (max-width: 550px) {
                .governanceItem > div:nth-child(2) {
                    width: calc(100% - 22px);
                }
                .governanceItem > div:nth-child(3) {
                    width: 100%;
                    padding-top: 15px;
                }
            }
            @keyframes pulsegray {
                0% {
                    transform: scale(0.95);
                    box-shadow: 0 0 0 0 rgba(192, 192, 192, 0.7);
                }
                
                70% {
                    transform: scale(1);
                    box-shadow: 0 0 0 5px rgba(192, 192, 192, 0);
                }
                
                100% {
                    transform: scale(0.95);
                    box-shadow: 0 0 0 0 rgba(192, 192, 192, 0);
                }
            }
            `}</style>
        </>
    )
}