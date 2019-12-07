const bodyParser = require('body-parser');
const express = require('express');
const humps = require('humps');
const fetch = require('node-fetch');
let i = 1


const router = express.Router();

const dates = new Date();


router.get('/testTimer/:id', (req, res) => {
  console.log('i', i);
  const id = req.params.id;
  let today = new Date()
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  // console.log(id, time);
});

module.exports = router;
