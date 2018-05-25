const express = require("express");
const req = require('request-promise-native');
const fetch = require('fetch');
const bodyParser = require('body-parser');

const port = 3000;

// git
// https://gist.github.com/harlantwood/2935203

const user = 'gugulete';
const repo = 'hooks-test';
const branchName = 'master';
const baseUrl = `https://api.github.com/repos/${user}/${repo}`;
const flowPath='bot/cognitive-flow.json'

const app = express();
app.use(bodyParser.json());

app.post('/payload', (request, response) => {
    console.log(request.body);
    response.send('Hello from Express!')
});
const options = {
    headers: {
        'User-Agent': repo
    }
};

app.post('/commit', async (request, response) => {
    const flow = request.body;

    try {
        const branch = JSON.parse(await req.get(`${baseUrl}/branches/${branchName}`, options));
        const tree = JSON.parse(await req.get(`${branch.commit.commit.tree.url}?recursive=1`, options));

        let index = -1;
        element = tree.tree.find((b, i) => {
            if (b.path === flowPath) {
                index = i;
                return true;
            }
            return false;
        });

        console.log(element);

    } catch (error) {
        console.log(error);
    }

    response.send('ok');
});

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }

    console.log(`server is listening on ${port}`)
});