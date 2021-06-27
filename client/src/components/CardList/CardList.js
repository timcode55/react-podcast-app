import React from 'react';
import './CardList.css';
import Card from '../Card/Card';
import Arrow from '../arrow/Arrow';

const CardList = ({ podcasts, topPodcasts, getData }) => {
	console.log(topPodcasts, 'topPodcasts in CardList');
	return (
		<div className="outer-container">
			<div className="container">
				<div className="podcast-display">
					{topPodcasts ? (
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
