import React from 'react';
import './Card.css';
import icons8 from '../../images/Hashtag-26-52px/icons8-hashtag-52.png';
import rating from '../../images/Star-24-48px/icons8-star-48.png';

const Card = ({ podcast, getRecommend, recommend }) => {
	// const { podcast } = props;
	console.log(podcast, 'podcast props in card WILL UPDATE******');

	const test = () => {
		getRecommend('42c4bad366a44c9085c9e4342aa9a441');
		console.log('clicked card');
	};

	return (
		<div className="div-style">
			<div className="podcontainer" onClick={test}>
				{/* <a href={podcast.listennotes_url} target="_blank" rel="noreferrer"> */}
				<a href={podcast.listennotes_url} target="_blank" rel="noreferrer">
					<img className="podimage" src={podcast.image} alt="pod1" />
				</a>
				<div className="podtitle">
					<h1>{podcast.title.substring(0, 52)}</h1>
				</div>
				<div className="desc">
					<p className="ptext">
						{podcast.description && podcast.description.substring(0, 200).replace(/(<([^>]+)>)/gi, '')}...
					</p>
				</div>
				<div className="podButtons">
					<div className="webButton">
						<a href={podcast.website} target="_blank" rel="noreferrer">
							<button>Website</button>
						</a>
					</div>
					<div className="webButton">
						<a href={podcast.itunes} target="_blank" rel="noreferrer">
							<button>iTunes Link</button>
						</a>
					</div>
				</div>
				<div className="contratings">
					<div>
						<img className="ratingimage" src={icons8} alt="ratingimage" />
						<p className="ratingtext"># of Ratings</p>
						<p className="ratingtext">{podcast.numberOfRatings}</p>
					</div>
					<div>
						<img className="ratingimage" src={rating} alt="ratingimage" />
						<p className="ratingtext">iTunes Rating</p>
						<p className="ratingtext">{podcast.rating}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Card;
