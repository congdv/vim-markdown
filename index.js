const Bundler = require('parcel-bundler');
const express = require('express');

const app = express();

const entryFile = './public/index.html';
const options = {};
const bundler = new Bundler(entryFile, options);
app.use(bundler.middleware());

const PORT = process.env.PORT || 3000;

console.log(`The server is running on port ${PORT}`);

app.listen(PORT);