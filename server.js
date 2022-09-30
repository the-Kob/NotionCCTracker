const express = require("express");
const moduleToFetch = require("./notionclient");
const getMainDatabase = moduleToFetch.getMainDatabase;

const app = express();

const port = 8080;

app.use(express.static("public"));

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.get("/sets", async (req, res) => {
    const sets = await getMainDatabase();
    res.json(sets);
});

app.listen(port, console.log(`Server started on ${port}`));