const express = require ('express');
const connection = require('./db/conn')
const mainRoute = require('./routes/route');
const app = express();
const port = 8000 ;

app.use(express.json());
app.use(mainRoute);

app.listen(port ,(()=>{
    console.log(`server is running on the port  no ${port}`);
}))