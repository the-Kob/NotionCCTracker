require("dotenv").config();
const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const mainDatabaseId = process.env.NOTION_API_MAIN_DATABASE;

exports.getDatabase = async function () {
    const response = await notion.databases.query({ database_id: mainDatabaseId });

    const responseResults = response.results.map((page) => {
        return {
            id: page.id,
            name: page.properties.Name.title[0]?.plain_text,
            url: page.url
        };
    });

    return responseResults;
};