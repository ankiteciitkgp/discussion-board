const { commentsTable } = require('./airtable');
const formattedReturn = require('./formattedReturn');
module.exports = async (event) => {
    try {
        const url = event.path.split("/");
        id = url[url.length-1];
        const comments = await commentsTable.select({
            filterByFormula: "{discussion_id} =" + id
        }).firstPage();
        const formattedComments = comments.map((comment) => ({
            id: comment.id,
            ...comment.fields,
        }));
        return formattedReturn(200, formattedComments);
    } catch (err) {
        console.error(err);
        return formattedReturn(500, {});
    }
};