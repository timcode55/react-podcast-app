import React, { useState, useEffect } from 'react';
import './CardList.css';
import Card from '../Card/Card';
import Arrow from '../arrow/Arrow';

const CardList = ({ podcasts, topPodcasts, getData, loader }) => {
	const [ isLoading, setIsLoading ] = useState(true);
	console.log(topPodcasts, 'topPodcasts in CardList');
	console.log(loader, 'loader in CardList');

	useEffect(() => {
		setTimeout(() => setIsLoading(false), 6000);
	}, []);

	return (
		<div className="outer-container">
			<div className="container">
				<div className="podcast-display">
					{isLoading ? (
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
			{podcasts.podcasts[0] ? <Arrow getData={getData} showArrow={topPodcasts} /> : null}
		</div>
	);
};

export default CardList;
