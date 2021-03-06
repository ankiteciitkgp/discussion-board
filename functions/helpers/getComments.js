const { commentsTable } = require('./airtable');
const formattedReturn = require('./formattedReturn');
const fetch = require('node-fetch');

module.exports = async (event) => {
    try {
        const url = event.path.split("/");
        id = url[url.length - 1];

        var requestOptions = {
            method: 'GET',
            headers: {"Authorization": "Bearer " + process.env.AIRTABLE_API_KEY},
            redirect: 'follow'
        };
        var resp = await fetch("https://api.airtable.com/v0/appSCqrEiqkxSEQpG/Comments?pageSize=10&sort[0][field]=id&sort[0][direction]=desc&view=Grid view&filterByFormula={topic_id} =" + id, requestOptions);
        
        const jsonResp = await resp.json();
        return formattedReturn(200, jsonResp);
    } catch (err) {
        console.error(err);
        return formattedReturn(500, {});
    }
};
