const express = require('express');
const bodyParser = require('body-parser');
const rp = require('request-promise');
const $ = require('cheerio');
const cors = require('cors');
const channels = require('./controllers/channels');

const url = 'https://www.lrt.lt/mediateka/tiesiogiai/lrt-televizija';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  return res.status(200).send({'message': 'The server is working!'});
})

//Getting the infromation from LRT website
app.get('/channels', (req, res) => {channels.handleChannels(req, res, rp, $, url)})

//Settingg PORT listening
app.listen(process.env.PORT || 3000, () => {
  console.log(`App is running on PORT: ${process.env.PORT}`)
});
