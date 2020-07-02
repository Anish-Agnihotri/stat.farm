export default function SmallCard(props) {
    return(
        <>
            <div className="statcard">
                <div>
                    <span>{props.name}</span>
                </div>
                <div>
                    <span>{props.content}</span>
                </div>
            </div>
            <style jsx>{`
            .statcard {
                width: calc((100% - 120px) / 4);
                height: 100px;
                background-color: #fff;
                display: inline-block;
                margin: 20px 10px;
                border-radius: 5px;
                border: 1px solid #e7eaf3;
                box-shadow: 0 0 35px rgba(127,150,174,.125);
            }
            .statcard > div:nth-child(1) {
                height: 35px;
                width: 100%;
                display: inline-block;
                border-top-left-radius: 5px;
                border-top-right-radius: 5px;
                border-bottom: 1.5px solid #f1f1f3;
                text-align: left;
            }
            .statcard > div:nth-child(1) > span {
                font-size: 14px;
                font-weight: 700;
                display: inline-block;
                margin: 10px;
            }
            .statcard > div:nth-child(2) {
                display: inline-block;
                width: 100%;
                height: 64px;
                border-bottom-left-radius: 5px;
                border-bottom-right-radius: 5px;
                text-align: left;
            }
            .statcard > div:nth-child(2) > span {
                font-size: 27px;
                display: inline-block;
                transform: translate(15px, 15px);
            }
            @media screen and (max-width: 1225px) {
                .statcard {
                    width: calc(50% - 40px);
                }
                .statcard:nth-of-type(1), .statcard:nth-of-type(2) {
                    margin-bottom: 0px;
                }
            }
            @media screen and (max-width: 600px) {
                .statcard {
                    width: calc(100% - 40px);
                }
                .statcard:nth-of-type(3) {
                    margin-bottom: 0px;
                }
            }
            `}</style>
        </>
    )
}