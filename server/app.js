const mongoose = require('mongoose');
const fs = require('fs');
const cheerio = require('cheerio');
const request = require('request-promise');
require('./db/mongoose');
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 7000;
const bodyParser = require('body-parser');

app.use(cors());

const dotenv = require('dotenv');

const Rating = require('./db/Rating');
const connectDB = require('./db/mongoose');

dotenv.config({ path: './config.env' });

connectDB();

app.get('/', (req, res) => res.send('Hello World Test'));

app.get('/findId', async (req, res, next) => {
	let id = req.query.data;
	console.log(id, 'id');
	try {
		const podcast = await Rating.findOne({ id }).lean();
		res.send(podcast);
	} catch (e) {
		res.status(500).send();
	}
});

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	next();
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
// console.log(process.env.PORT);
// app.listen(process.env.PORT || 7000, () => console.log(`App listening on port ${PORT}`));