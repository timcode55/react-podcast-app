const mongoose = require('mongoose');
const fs = require('fs');
const cheerio = require('cheerio');
const request = require('request-promise');
require('./db/mongoose');
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 7000;
var bodyParser = require('body-parser');

app.use(cors());
app.use(
	express.urlencoded({
		extended: true
	})
);
app.use(express.json());
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	next();
});

const dotenv = require('dotenv');

const Rating = require('./db/Rating');
const connectDB = require('./db/mongoose');

dotenv.config({ path: './config.env' });

connectDB();

app.get('/', (req, res) => res.send('Hello World Test'));
app.get('/test', (req, res) => res.send('Test Route'));

app.post('/todos', (req, res) => {
	console.log(req.query.rating, 'testingtodo');
});

app.get('/findId', async (req, res, next) => {
	let id = req.query.data;
	// console.log(id, 'id');
	try {
		const podcast = await Rating.findOne({ id }).lean();
		res.send(podcast);
	} catch (e) {
		res.status(500).send();
	}
});

app.post('/getTopPodcasts', async (req, res, next) => {
	console.log(req.query.rating, 'req.query.rating');
	console.log(req.query.numberRatings, 'req.query.#');
	let rating = req.query.rating;
	let numberRatings = req.query.numberRatings;
	try {
		const topPodcasts = await Rating.find({
			rating: { $gte: rating },
			numberOfRatings: { $gte: numberRatings },
			genre: 'True Crime'
		}).lean();
		console.log(topPodcasts, 'topPodcasts');
		res.send(topPodcasts);
	} catch (e) {
		res.status(500).send();
	}
});

// app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
app.listen(process.env.PORT || 7000, () => console.log(`App listening on port ${PORT}`));
