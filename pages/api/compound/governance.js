import axios from 'axios'

export default (req, res) => {
    return new Promise(resolve => {
        axios.get("https://api.compound.finance/api/v2/governance/accounts?page_size=100&page_number=1&with_history=false&network=mainnet").then(compaddr => {
            axios.get("https://api.compound.finance/api/v2/governance/proposals").then(gov => {
                let comp_holders = compaddr.data.accounts;
                
                for (let i = 0; i < comp_holders.length; i++) {
                    if (comp_holders[i].display_name === 'Can Not Lose') {
                        comp_holders[i].image_url = '';
                    }
                }
                
                let response = {
                    "addresses": compaddr.data.accounts,
                    "proposals": gov.data.proposals,
                }

                res.send(response);
                res.status(200).end();
                resolve();
            })
        })
    })
}