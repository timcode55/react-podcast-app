const mongoose = require('mongoose');
const fs = require('fs');
const cheerio = require('cheerio');
const request = require('request-promise');
require('./db/mongoose');
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 7000;
const { graphqlHTTP } = require('express-graphql');
const bodyParser = require('body-parser');
const { buildSchema } = require('graphql');
const expressPlayground = require('graphql-playground-middleware-express').default;

app.use(bodyParser.json());
app.get('/playground', expressPlayground({ endpoint: '/graphql' }));

app.use(
	'/graphql',
	graphqlHTTP({
		schema: buildSchema(`
      type RootQuery {
        hello: String!
      }

      type RootMutation{
        addUser(userInput: UserInput!):User!
      }

      type User {
        _id: ID!
        email: String!
        password: String!
      }

      input UserInput {
        email: String!
        password: String!
      }

      schema {
        query: RootQuery
        mutation: RootMutation
      }
    `),
		rootValue: {
			hello: () => {
				return 'Hello Back!!';
			}
		},
		graphiql: true
	})
);

app.use(cors());
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

// app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
console.log(process.env.PORT);
app.listen(process.env.PORT || 7000, () => console.log(`App listening on port ${PORT}`));
