const { topicTable } = require('./airtable');
const formattedReturn = require('./formattedReturn');
module.exports = async (event) => {
    try {
        const topics = await topicTable.select().firstPage();
        const formattedTopics = topics.map((topic) => ({
            id: topic.id,
            ...topic.fields,
        }));
        return formattedReturn(200, formattedTopics);
    } catch (err) {
        console.error(err);
        return formattedReturn(500, {});
    }
};
