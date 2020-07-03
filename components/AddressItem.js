export default function AddressItem(props) {
    return(
        <>
            <a href={props.address.account_url} target="_blank" rel="noopener noreferrer" className="accountItem">
                {props.address.image_url ? (
                    <img src={props.address.image_url} alt={`${props.address.image_url} profile picture`} />
                ) : (
                    <img src={`https://api.adorable.io/avatars/50/${props.address.image_url}.png`} alt={`${props.address.image_url} profile picture`} />
                )}
                {props.address.display_name ? (
                    <span><strong>{props.address.display_name}</strong></span>
                ) : (
                    <span><strong>{props.address.address.substring(0, 7) + '...' + props.address.address.slice(props.address.address.length - 5)}</strong></span>
                )}
                <span className="vol">${(props.price * props.address.votes).toLocaleString()}</span>
            </a>
            <style jsx>{`
            .accountItem {
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
            .accountItem:nth-of-type(2n) {
                background-color: #FDFDFD;
            }
            .accountItem:hover {
                background-color: #fde7e7;
            }
            .accountItem > img {
                height: 30px;
                width: 30px;
                border-radius: 50%;
                margin-right: 10px;
            }
            .accountItem > span:nth-of-type(1) {
                vertical-align: top;
                display: inline-block;
                transform: translateY(8px);
            }
            .vol {
                display: inline-block;
                top: 17.5px;
                right: 15px;
                position: absolute;
                font-weight: 500;
                font-size: 15px;
                background-color: #EFEFF1;
                padding: 2px 5px;
                border-radius: 5px;
            }
            `}</style>
        </>
    )
}