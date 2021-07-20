import React, { useState, useEffect, useContext } from 'react';
import './CardList.css';
import Card from '../Card/Card';
import Arrow from '../arrow/Arrow';
import { PodcastContext } from '../../context/PodcastContext';

const CardList = ({ podcasts, topPodcasts, getData, loader }) => {
	// const [ isLoading, setIsLoading ] = useState(true);
	const [ displayTopPodcasts, setDisplayTopPodcasts ] = useState(false);
	const [ state, setState ] = useContext(PodcastContext);
	console.log(topPodcasts, 'topPodcasts in CardList');
	console.log(loader, 'loader in CardList');

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

	return (
		<div className="outer-container">
			<div className="container">
				<div className="podcast-display">
					{state.isLoading ? (
						<div id="preloader">
							<div id="loader" />
						</div>
					) : topPodcasts ? (
						topPodcasts.map((pod) => <Card key={pod.id} podcast={pod} />)
					) : podcasts.podcasts[0] ? (
						podcasts.podcasts[0].map((pod) => <Card key={pod.id} podcast={pod} />)
					) : (
						<div id="preloader">
							<div id="loader" />
						</div>
					)}
				</div>
			</div>
			{podcasts.podcasts[0] && !state.isLoading ? <Arrow getData={getData} showArrow={topPodcasts} /> : null}
		</div>
	);
};

export default CardList;
