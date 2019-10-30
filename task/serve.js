/**
 * node task/serve dist 8383
 */

const path = require('path');
const express     = require('express');
const bodyParser = require('body-parser');
const serveStatic = require('serve-static');
const root = process.argv[2]||'doc';
const port = process.argv[3]||8183;
const dontOpen = process.argv.join(' ').includes(' -s')||false;
const openBrowser = !dontOpen&&require('open');
const router = express.Router();

const rootIndex = path.join(__dirname + '/../dist/index.html');
const genericSucces = (req, res) => res.status(200).json({ success: true, message: 'Success', msg: 'msgSuccess' });
const genericError = (req, res) => res.status(500).json({ error: 'Something went wrong' });

const flights = require('../data/flights').flights

express()
  .use(serveStatic(`./${root}/`))

  .use(bodyParser.urlencoded({ extended: true }))

  .get('/api', genericSucces)
  .get('/api/flights', getFlights)

  .get('/', (req, res) => res.sendFile(rootIndex))
  .get('/*', genericError)
  .post('/*', genericError)
  .delete('/*', genericError)
  .use('/api', router)

  .listen(port);

openBrowser&&openBrowser('http://localhost:'+port);

function getFlights(req, res) {
  const searchQuery = req.query.s.toLowerCase();
  res.json(flights.filter(({airport, flightNumber})=>
        airport.toLowerCase().includes(searchQuery)||
        flightNumber.toLowerCase().includes(searchQuery)
    )
  )
}