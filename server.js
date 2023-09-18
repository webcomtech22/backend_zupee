const express = require('express');
const cors = require('cors')
const app = express();
const path = require('path');
const bodyParser = require('body-parser')
const connection = require('./app/models/db.js')
const PORT = process.env.PORT || 3000

app.use(cors())

app.use(bodyParser.json());
// app.use(express.json())
// const publicPath = path.join(__dirname,'./public')
// app.use(express.static(publicPath))


// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

 app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers",
    "Origin, X-Requested-With Content-Type Accept");
    res.setHeader("Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS");
    next();    
 });

const imagesFolderPath = path.join(__dirname, 'uploads');
app.use('/uploads',express.static(imagesFolderPath));

// require('./routes/zupeeHome.routes.js')(app)
require('./routes/Api.js')(app)


app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`)
})