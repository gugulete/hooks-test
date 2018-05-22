const express = require( "express");
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/payload', (request, response) => {
   
    console.log(request.body);
    response.send('Hello from Express!')
});


app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }

    console.log(`server is listening on ${port}`)
});