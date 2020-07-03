export default function WideCard(props, { children }) {
    return(
        <>
            <div className="widecard">
                <div>
                    <span>{props.name}</span>
                </div>
                <div>
                    {children}
                </div>
            </div>
            <style jsx>{`
            .widecard {
                width: calc(60% - 40px);
                margin: 0px 10px 0px 10px;
                background-color: #fff;
                border-radius: 5px;
                border: 1px solid #e7eaf3;
                box-shadow: 0 0 35px rgba(127,150,174,.125);
                display: inline-block;
                height: 436px;
            }
            .widecard > div:nth-child(1) {
                height: 35px;
                width: 100%;
                display: inline-block;
                border-top-left-radius: 5px;
                border-top-right-radius: 5px;
                border-bottom: 1px solid #e7eaf3;
                text-align: left;
            }
            .widecard > div:nth-child(1) > span {
                font-size: 14px;
                font-weight: 700;
                display: inline-block;
                margin: 10px;
            }
            .widecard > div:nth-child(2) {
                display: inline-block;
                width: 100%;
                border-bottom-left-radius: 5px;
                border-bottom-right-radius: 5px;
                text-align: left;
                height: 400px;
                overflow-y: auto;
            }
            @media screen and (max-width: 1000px) {
                .widecard {
                    width: calc(100% - 55px);
                }
                .widecard:nth-of-type(2) {
                    margin-top: 20px;
                }
            }
            @media screen and (max-width: 600px) {
                .widecard {
                    width: calc(100% - 40px);
                }
            }
            `}</style>
        </>
    )
}