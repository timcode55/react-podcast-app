const mongoose = require('mongoose');
const fs = require('fs');
const cheerio = require('cheerio');
const request = require('request-promise');
require('./db/mongoose');
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 7000;
// const bodyParser = require('body-parser');

app.use(cors());
app.use(express.json());
// app.use(express.urlencoded());
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	next();
});

const dotenv = require('dotenv');

const Rating = require('./db/Rating');
const connectDB = require('./db/mongoose');

dotenv.config({ path: './config.env' });

connectDB();

app.get('/', (req, res) => res.send('Hello World Test'));
app.get('/test', (req, res) => res.send('Test Route'));

app.post('/findId', async (req, res, next) => {
	// let id = req.query.data;
	let newPodArray = [];
	// console.log(req.body.pod);
	for (let pod of req.body.pod) {
		// console.log(pod, 'pod in loop *****');
		const id = pod.id;
		// console.log(id, 'id **************');
		const podcast = await Rating.findOne({ id }).lean();
		console.log(podcast, 'podcast in db call');
		if (podcast) {
			pod['rating'] = podcast.rating;
			pod['numberOfRatings'] = podcast.numberOfRatings || 'N/A';
			pod['itunes'] = podcast.itunes;
			newPodArray.push(pod);
		} else {
			newPodArray.push(pod);
		}
	}
	res.send(newPodArray);
	// try {
	// 	const podcast = await Rating.findOne({ id }).lean();
	// 	res.send(podcast);
	// } catch (e) {
	// 	res.status(500).send();
	// }
});

// app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
console.log(process.env.PORT);
app.listen(process.env.PORT || 7000, () => console.log(`App listening on port ${PORT}`));
