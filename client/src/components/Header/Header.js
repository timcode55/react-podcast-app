import React, { useState, useContext } from 'react';
import CardList from '../CardList/CardList';
import { array1, array2, categoriesArray } from '../../utils/category-list';
import { PodcastContext } from '../../context/PodcastContext';
import './Header.css';
import axios from 'axios';

const Header = (props) => {
	console.log(props, 'props in Header.js');
	const [ state, setState ] = useContext(PodcastContext);
	const [ value, setValue ] = useState('');
	const [ category, setCategory ] = useState('');
	const [ rating, setRating ] = useState('');
	const [ numberRatings, setNumberRatings ] = useState('');
	const [ topPodcasts, setTopPodcasts ] = useState(null);

	// axios.post('http://localhost:7000/todos', {
	// 	todo: 'Buy the milk'
	// });

	const handleChange = (e) => {
		setState({ page: 1, category: e.target.value });
		let findValue = Number(e.target.value);
		let findCategory = categoriesArray.find((item) => item.id === findValue).name;
		setCategory(findCategory);
		props.getApiData(e.target.value, 1);
		setTopPodcasts('');
	};

	const handleRatingInput = (e) => {
		e.preventDefault();
		setRating(e.target.value);
		// setNumberRatings({ [e.target.name]: value });
		// console.log(value, 'rating in Header');
		// props.getTopPodcasts(value, 100);
	};
	const handleNumberRatingsInput = (e) => {
		e.preventDefault();
		setNumberRatings(e.target.value);
		// setNumberRatings({ [e.target.name]: value });
		// console.log(value, 'rating in Header');
		// props.getTopPodcasts(value, 100);
	};

	const handleClick = async (e) => {
		console.log(rating, 'rating on click');
		e.preventDefault();
		await axios
			.post(`http://localhost:7000/getTopPodcasts/?rating=${rating}&numberRatings=${numberRatings}`, {
				body: {
					todo: { rating }
				}
			})
			.then(function(response) {
				console.log(response.data, 'response.data 29 in Header');
				setTopPodcasts(response.data);
				setRating('');
				setNumberRatings('');
			})
			.catch(function(error) {
				console.log(error);
			});
		// const value = e.target.value;
		// setRating(value);

		// setNumberRatings({ [e.target.name]: value });
		// console.log(rating, 'rating in Header');
		// console.log(rating, 'rating in Header');
		// props.getTopPodcasts(value, 100);
	};

	console.log(rating, 'rating');
	console.log(numberRatings, 'numberRatings');
	return (
		<div>
			<div className="top-section">
				<h1 className="title">TOP PODCASTS - {category.toUpperCase() || 'most popular'.toUpperCase()}</h1>
				<div className="selection-boxes">
					<div className="selection-box">
						<form>
							<label>
								<span>Choose a Genre (A - M) </span>
							</label>
							<select id="selection" name="scripts" onChange={handleChange}>
								{array1.map((item) => {
									return (
										<option key={item.id} value={item.id}>
											{item.name}
										</option>
									);
								})}
							</select>
						</form>
					</div>
					<div className="selection-box">
						<form>
							<label>
								<span className="dropdown-title">Choose a Genre (M - Z) </span>
								<select id="selection2" name="scripts" onChange={handleChange}>
									{array2.map((item) => {
										return (
											<option className="option" key={item.id} value={item.id}>
												{item.name}
											</option>
										);
									})}
								</select>
							</label>
						</form>
					</div>
				</div>
			</div>
			<form>
				{/* <fieldset> */}
				<label>
					<p>Enter Min Rating</p>
					<input type="text" name="rating" value={rating} onChange={handleRatingInput} />
				</label>
				<label>
					<p>Enter # of Ratings</p>
					<input type="text" name="numberRatings" value={numberRatings} onChange={handleNumberRatingsInput} />
				</label>
				{/* </fieldset> */}
				<button type="submit" onClick={handleClick}>
					Submit
				</button>
			</form>
			{/* <input type="text">Enter Min Rating</input>
			<input type="text">Enter # of Ratings</input> */}
			<CardList
				topPodcasts={topPodcasts}
				podcasts={props}
				category={parseInt(value)}
				getData={props.getApiData}
			/>
		</div>
	);
};

export default Header;
