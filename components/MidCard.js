export default function MidCard(props) {
    return(
        <>
            <div className="midcard">
                <div>
                    <span>{props.name}</span>
                </div>
                <div>
                    {props.children}
                </div>
            </div>
            <style jsx>{`
            .midcard {
                width: calc(40% - 40px);
                margin: 0px 10px 0px 10px;
                background-color: #ccc;
                display: inline-block;
                height: 436px;
                background-color: #fff;
                border-radius: 5px;
                border: 1px solid #e7eaf3;
                box-shadow: 0 0 35px rgba(127,150,174,.125);
            }
            .midcard > div:nth-child(1) {
                height: 35px;
                width: 100%;
                display: inline-block;
                border-top-left-radius: 5px;
                border-top-right-radius: 5px;
                border-bottom: 1px solid #e7eaf3;
                text-align: left;
            }
            .midcard > div:nth-child(1) > span {
                font-size: 14px;
                font-weight: 700;
                display: inline-block;
                margin: 10px;
            }
            .midcard > div:nth-child(2) {
                display: inline-block;
                width: 100%;
                border-bottom-left-radius: 5px;
                border-bottom-right-radius: 5px;
                text-align: left;
                height: 400px;
                overflow-y: auto;
            }
            @media screen and (max-width: 1000px) {
                .midcard {
                    width: calc(100% - 55px);
                    margin-top: 20px;
                }
            }
            @media screen and (max-width: 600px) {
                .midcard {
                    width: calc(100% - 40px);
                }
            }
            `}</style>
        </>
    )
}