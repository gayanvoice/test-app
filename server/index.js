const express = require('express')
const path = require('path');
const router = require("./routes");
const port = 8080

const application = express()
application.use(express.static(path.resolve(__dirname, '../client/dist')));
application.use(express.json())
application.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") return res.sendStatus(204);
    next();
});
application.use('/api/', router);
application.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
});

application.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})