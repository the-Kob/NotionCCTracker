require("dotenv").config();
const { Client, APIErrorCode } = require("@notionhq/client");
const { sendStatus } = require("express/lib/response");

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const mainDatabaseId = process.env.NOTION_API_MAIN_DATABASE;

var sets = [];

exports.getMainDatabase = async function () {
    try {
        const response = await notion.databases.query({ 
            database_id: mainDatabaseId 
        });

        const responseResults = response.results.map((page) => {
            sets.push(page.id);
            return {
                id: page.id,
                name: page.properties.Name.title[0]?.plain_text,
                cover: page.cover
            };
        });

        console.log(sets);
    
        return responseResults;
    } catch(error) {
        if(error.code === APIErrorCode.ObjectNotFound) {
            // Handle error by prompting user that main database is unavailable
        } else {
            console.error(error);
        }
    }
};

