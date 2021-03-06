import React, { useState, useEffect, useContext } from 'react';
import './CardList.css';
import Card from '../Card/Card';
import Arrow from '../arrow/Arrow';
import { PodcastContext } from '../../context/PodcastContext';

const CardList = ({ podcasts, topPodcasts, getData, isLoading, getRecommend, recommendations }) => {
	// const [ isLoading, setIsLoading ] = useState(true);
	const [ displayTopPodcasts, setDisplayTopPodcasts ] = useState(false);
	const [ state, setState ] = useContext(PodcastContext);
	console.log(topPodcasts, 'topPodcasts in CardList');
	console.log(podcasts, 'PODCAST PROPS IN CARDLIST12******');
	console.log(recommendations, 'recommendations in CardList');

	// useEffect(() => {
	// 	setTimeout(() => setIsLoading(false), 6000);
	// }, []);

	useEffect(
		() => {
			if (topPodcasts) {
				setDisplayTopPodcasts(true);
				console.log('There are Top Podcasts to Display!!!!');
			}
		},
		[ topPodcasts ]
	);
	useEffect(
		() => {
			if (recommendations) {
				topPodcasts = recommendations;
				console.log('topPodcasts swapped with recommendations');
			}
		},
		[ recommendations ]
	);

	return (
		<div className="outer-container">
			<div className="container">
				<div className="podcast-display">
					{isLoading ? (
						<div id="preloader">
							<div id="loader" />
						</div>
					) : topPodcasts ? (
						topPodcasts.map((pod) => <Card key={pod.id} podcast={pod} getRecommend={getRecommend} />)
					) : podcasts.podcasts[0] ? (
						podcasts.podcasts[0].map((pod) => (
							<Card key={pod.id} podcast={pod} getRecommend={getRecommend} />
						))
					) : (
						<div id="preloader">
							<div id="loader" />
						</div>
					)}
					{/* {recommendations && recommendations.map((pod) => <Card key={pod.id} podcast={pod} />)} */}
				</div>
			</div>
			{podcasts.podcasts[0] && !state.isLoading ? <Arrow getData={getData} showArrow={isLoading} /> : null}
		</div>
	);
};

export default CardList;
