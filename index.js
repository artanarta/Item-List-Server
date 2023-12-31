// import dotenv and call config function to load environment
const express = require('express');
require('dotenv').config();

const router = require('./src/routes');
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use('/api/v1/', router);
app.use('/uploads', express.static('uploads'));

app.listen(port, () => console.log(`Listening on port ${port}!`));