const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const port = 3000;
const server = express();
const client = require('../database/postgresIndex.js')
const globalLength = require('../database/createData.js')

require('../database');

server.use(morgan('dev'));
server.use(bodyParser.json());
server.use(express.static(path.join(__dirname, '../client/dist')));


server.get('/api/games/one', (req, res) => {
  let randomIndex = Math.floor(Math.random() * globalLength);
  let queryStr = `SELECT (imgurl, item, price, system) FROM game WHERE index = ${randomIndex};`
  client.query(queryStr, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      console.log(result)
      res.send(result)
    }
  })
})

server.get('/api/games/:system/similar', (req, res) => {
  const system = req.params.system
  console.log(system)
  let queryStr = `SELECT (imgurl, item, price, system) FROM game WHERE system = '${system}' LIMIT 20`
  client.query(queryStr, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      console.log(result)
      res.send(result.rows)
    }
  })
})

server.get('/api/games/:system/together', (req, res) => {
  const system = req.params.system
  console.log(system)
  let queryStr = `SELECT (imgurl, item, price, system) FROM game WHERE system = '${system}' LIMIT 3`
  client.query(queryStr, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      console.log(result)
      res.send(result.rows)
    }
  })
})




server.listen(port, () => {
  console.log(`Listening on port ${port}`);
})

module.exports = server;



// server.get('/api/games/:system/similar', (req, res) => {
//   const system = req.params.system
//   console.log(system)
//   // maybe check only under index 1000
//   // where system = system and index < 1000
//   let queryStr = `SELECT (imgurl, item, price, system) FROM game WHERE system = '${system}';`
//   var results = []
//   for (var x = 0; x < 20; x++) {
//     client.query(queryStr, (err, result) => {
//       if (err) {
//         console.log(err)
//       } else {
//         // console.log(result)
//         results.push(result)
//       }
//     }, () => {
//       res.send(results)
//     })
//   }
// })
