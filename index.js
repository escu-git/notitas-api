const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var cors = require('cors');
const mongooseConnect = require('./helpers/moongose-connection');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

app.use((_, res) =>{
res.send({
message: 'Not found!'
})
});

mongooseConnect();

app.listen(5000, (req, res)=>{
console.log("Server is listening on port 5000");
})