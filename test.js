require('dotenv').config();
const jwt = require('jsonwebtoken');

const test = jwt.sign({ id: 1 }, process.env.PUBLIC_SECRET, {
  algorithm: 'RS256',
});

const result = jwt.verify(test, process.env.PRIVATE_SECRET, {
  algorithms: 'RS256',
});

console.log(result);
