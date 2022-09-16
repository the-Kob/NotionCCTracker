const express = require("express");
const moduleToFetch = require("./client");
const getDatabase = moduleToFetch.getDatabase;

const app = express();

const port = 8080;

app.use(express.static("public"));

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.get("/sets", async (req, res) => {
    const sets = await getDatabase();
    res.json(sets);
});

app.listen(port, console.log(`Server started on ${port}`));