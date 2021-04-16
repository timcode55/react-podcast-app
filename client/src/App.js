import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/Header/Header';
import { PodcastContext } from './context/PodcastContext';

function App() {
	const [ podcasts, setPodcasts ] = useState([]);
	const [ state, setState ] = useContext(PodcastContext);

	useEffect(() => {
		getApiData(67);
		setState({ page: 1, category: 67 });
	}, []);

	// 	const getApiData = async (genreId, page) => {
	// 		let t0 = performance.now();
	// 		await fetch(
	// 			`https://listen-api.listennotes.com/api/v2/best_podcasts?genre_id=${genreId}&page=${page}&region=us&safe_mode=0`,
	// 			{
	// 				method: 'GET',
	// 				headers: {
	// 					'Content-Type': 'application/json',
	// 					'X-ListenAPI-Key': process.env.REACT_APP_LISTEN_NOTES_API_KEY
	// 				},
	// 				credentials: 'same-origin'
	// 			}
	// 		).then((response) => {
	// 			response.json().then((data) => {
	// 				console.log(data, 'data in listennotes call see if doubling');
	// 				const getRating = async () => {
	// 					await axios({
	// 						method: 'post',
	// 						url: `http://localhost:7000/findId`,
	// 						headers: {},
	// 						data: {
	// 							pod: data.podcasts
	// 						}
	// 					})
	// 						.then(function(response) {
	// 							console.log(response.data);
	// 						})
	// 						.catch(function(error) {
	// 							console.log(error);
	// 						});

	// 					// for (let pod of data.podcasts) {
	// 					// 	const id = pod.id;
	// 					// 	await axios
	// 					// 		.get(`http://localhost:7000/findId/?data=${id}`)
	// 					// 		.then(function(response) {
	// 					// 			pod['rating'] = response.data.rating;
	// 					// 			pod['numberOfRatings'] = response.data.numberOfRatings || 'N/A';
	// 					// 			pod['itunes'] = response.data.itunes;
	// 					// 		})
	// 					// 		.catch(function(error) {
	// 					// 			console.log(error);
	// 					// 		});
	// 					// }
	// 					await setPodcasts([ data.podcasts ]);
	// 				};
	// 				getRating();
	// 			});
	// 		});
	// 		let t1 = performance.now();
	// 		console.log('Call to execute main function took' + (t1 - t0) + 'milliseconds');
	// 	};

	// 	return <Header podcasts={podcasts} getApiData={getApiData} />;
	// }
	const getApiData = async (genreId, page) => {
		let t0 = performance.now();
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
				console.log(data, 'data in listennotes call see if doubling');
				const getRating = async () => {
					await axios({
						method: 'post',
						url: `http://localhost:7000/findId/`,
						data: {
							pod: data.podcasts
						}
					})
						.then(function(response) {
							console.log(response, 'response from backend with fullarray');
						})
						.catch(function(error) {
							console.log(error);
						});

					await setPodcasts([ response.data ]);
				};
				getRating();
			});
		});
		console.log(podcasts, 'podcasts after full backend run');
		let t1 = performance.now();
		console.log('Call to execute main function took' + (t1 - t0) + 'milliseconds');
	};

	return <Header podcasts={podcasts} getApiData={getApiData} />;
}

export default App;
