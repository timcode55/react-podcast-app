import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/Header/Header';
import { PodcastContext } from './context/PodcastContext';

function App() {
	const [ podcasts, setPodcasts ] = useState([]);
	const [ recommendations, setRecommendations ] = useState([]);
	const [ state, setState ] = useContext(PodcastContext);

	useEffect(() => {
		getApiData(67);
		setState({ page: 1, category: 67 });
	}, []);

	const getApiData = async (genreId, page) => {
		await fetch(
			`https://listen-api.listennotes.com/api/v2/best_podcasts?genre_id=${genreId}&page=${page}&region=us&safe_mode=0`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'X-ListenAPI-Key': process.env.REACT_APP_LISTEN_NOTES_API_KEY
				},
				credentials: 'same-origin'
			}
		).then((response) => {
			response.json().then((data) => {
				console.log(data.podcasts, 'data in listennotes call see if doubling');
				const getRating = async () => {
					for (let pod of data.podcasts) {
						const id = pod.id;
						await axios
							.get(`http://localhost:7000/findId/?data=${id}`)
							.then(function(response) {
								pod['rating'] = response.data.rating;
								pod['numberOfRatings'] = response.data.numberOfRatings || 'N/A';
								pod['itunes'] = response.data.itunes;
								// pod['description'] = response.data.description;
							})
							.catch(function(error) {
								console.log(error);
							});
					}
					await setPodcasts([ data.podcasts ]);
				};
				getRating();
			});
		});
	};

	const getRecommend = async (episodeId) => {
		console.log(episodeId, 'EPISODEID');
		console.log(typeof episodeId, ' TYPEOF EPISODEID');
		// episodeId = '11d262e4a57d46c2bc939449a43961c4';
		await fetch(`https://listen-api.listennotes.com/api/v2/podcasts/${episodeId}/recommendations`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'X-ListenAPI-Key': process.env.REACT_APP_LISTEN_NOTES_API_KEY
			},
			credentials: 'same-origin'
		}).then((response) => {
			response.json().then(async (data) => {
				// console.log(response.data, 'response.data');
				console.log(data.recommendations, 'data RECOMMENDATIONS*****');
				// const getRating = async () => {
				// 	for (let pod of data.podcasts) {
				// 		const id = pod.id;
				// 		await axios
				// 			.get(`http://localhost:7000/findId/?data=${id}`)
				// 			.then(function(response) {
				// 				pod['rating'] = response.data.rating;
				// 				pod['numberOfRatings'] = response.data.numberOfRatings || 'N/A';
				// 				pod['itunes'] = response.data.itunes;
				// 				// pod['description'] = response.data.description;
				// 			})
				// 			.catch(function(error) {
				// 				console.log(error);
				// 			});
				// 	}
				await setRecommendations(data.recommendations);
				// 	await setPodcasts([ data.podcasts ]);
				// };
				// getRating();
			});
		});
	};

	// const getTopPodcasts = async (rating, numberRatings) => {
	// 	// const getBest = async () => {
	// 	await axios
	// 		.post(`http://localhost:7000/getTopPodcasts/?rating=${rating}&numberRatings=${numberRatings}`, {
	// 			body: {
	// 				todo: { rating }
	// 			}
	// 		})
	// 		.then(function(response) {
	// 			console.log(response.data, 'response.data 29 in Header');
	// 			setPodcasts(response.data);
	// 		})
	// 		.catch(function(error) {
	// 			console.log(error);
	// 		});

	// 	// await setPodcasts([ data.podcasts ]);
	// 	// };
	// 	// getBest();
	// };
	console.log(podcasts, 'PODCASTS IN STATE 112*****');
	console.log(recommendations, 'RECOMMENDATIONS *****');
	return (
		<Header
			podcasts={podcasts}
			getApiData={getApiData}
			getRecommend={getRecommend}
			recommendations={recommendations}
		/>
	);
}

export default App;
