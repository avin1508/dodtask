const express = require('express')
const app = express();
require('dotenv').config()
const db = require('./config/db.config');
let uploadRoutes = require('./routes/uploadRoutes').router;




db.sync({ force: false })
    .then(e => console.log("Table Created"))
    .catch(e => console.log("error", e));

    require('./database/models/index')

app.use(express.json());

app.use('/file', uploadRoutes);

app.listen(6000, console.log("server started at port 6000"))