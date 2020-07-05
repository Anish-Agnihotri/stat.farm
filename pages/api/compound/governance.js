import axios from 'axios'

/*
    /api/compound/governance
    Returns data about COMP holders
    and governance proposals
*/

export default (req, res) => {
    return new Promise(resolve => {
        // Pull top 100 COMP holders
        axios.get("https://api.compound.finance/api/v2/governance/accounts?page_size=100&page_number=1&with_history=false&network=mainnet").then(compaddr => {
            // Pull Compound governance proposals
            axios.get("https://api.compound.finance/api/v2/governance/proposals").then(gov => {
                // Pull ETH price
                axios.get("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd").then(eth => {
                    let comp_holders = compaddr.data.accounts;
                    
                    // Fix error with user 'Can Not Lose''s profile picture
                    for (let i = 0; i < comp_holders.length; i++) {
                        if (comp_holders[i].display_name === 'Can Not Lose') {
                            comp_holders[i].image_url = '';
                        }
                    }
                    
                    // Return response object
                    let response = {
                        "addresses": compaddr.data.accounts,
                        "proposals": gov.data.proposals,
                        "current_price": eth.data.ethereum.usd
                    }

                    res.send(response);
                    res.status(200).end();
                    resolve();
                })
            })
        })
    })
}
