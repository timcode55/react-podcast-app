import React, { useState, useContext, useEffect } from "react";
import CardList from "../CardList/CardList";
import { array1, array2, categoriesArray } from "../../utils/category-list";
import { PodcastContext } from "../../context/PodcastContext";
import "./Header.css";
import axios from "axios";

const Header = (props) => {
  console.log(props, "props in Header.js");
  const [state, setState] = useContext(PodcastContext);
  const [value, setValue] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState("");
  const [numberRatings, setNumberRatings] = useState("");
  const [topPodcasts, setTopPodcasts] = useState(null);
  const [genre, setGenre] = useState("AI & Data Science");
  const [loader, setLoader] = useState(true);
  const [dbCategories, setDbCategories] = useState([]);

  // axios.post('http://localhost:7000/todos', {
  // 	todo: 'Buy the milk'
  // });

  useEffect(() => {
    categoriesArray.unshift({ id: 0, name: "", parent_id: 0 });
    setTimeout(() => setLoader(false), 6000);
  }, []);

  useEffect(() => {
    const getDbCategories = async (e) => {
      // e.preventDefault();
      await axios
        .get(`http://localhost:7000/getDbCategories`)
        .then(function (response) {
          setDbCategories(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    getDbCategories();
  }, []);

  const handleChange = (e) => {
    setLoader(true);
    setState({ page: 1, category: e.target.value });
    let findValue = Number(e.target.value);
    let findCategory = categoriesArray.find(
      (item) => item.id === findValue
    ).name;
    setCategory(findCategory);
    props.getApiData(e.target.value, 1);
    setTopPodcasts("");
    setLoader(false);
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

  const handleGenreInput = (e) => {
    e.preventDefault();
    console.log(e.target.value, "VALUE IN SELECT BOX IN GENRE 71**");
    setGenre(e.target.value);
    // setNumberRatings({ [e.target.name]: value });
    // console.log(value, 'rating in Header');
    // props.getTopPodcasts(value, 100);
  };

  const handleClick = async (e) => {
    console.log(rating, "rating on click");
    console.log(genre, "genre on click");
    console.log(numberRatings, "numberRatings on click");
    let stringGenre = encodeURIComponent(genre);
    console.log(stringGenre, "stringGenre");
    e.preventDefault();
    await axios
      .post(
        `http://localhost:7000/getTopPodcasts/?rating=${rating}&numberRatings=${numberRatings}&genre=${genre}`,
        {
          body: {
            todo: { rating }
          }
        }
      )
      .then(function (response) {
        // console.log(response.data, 'response.data 29 in Header');
        setTopPodcasts(response.data);
        setRating("");
        setNumberRatings("");
      })
      .catch(function (error) {
        console.log(error);
      });
    // const value = e.target.value;
    // setRating(value);

    // setNumberRatings({ [e.target.name]: value });
    // console.log(rating, 'rating in Header');
    // console.log(rating, 'rating in Header');
    // props.getTopPodcasts(value, 100);
  };
  // const getDbCategories = async (e) => {
  // 	// e.preventDefault();
  // 	await axios
  // 		.get(`http://localhost:7000/getDbCategories`)
  // 		.then(function(response) {
  // 			console.log(response.data, 'response.data 97 in Header');
  // 			setDbCategories(response.data);
  // 		})
  // 		.catch(function(error) {
  // 			console.log(error);
  // 		});
  // 	// const value = e.target.value;
  // 	// setRating(value);

  // 	// setNumberRatings({ [e.target.name]: value });
  // 	// console.log(rating, 'rating in Header');
  // 	// console.log(rating, 'rating in Header');
  // 	// props.getTopPodcasts(value, 100);
  // };
  // getDbCategories();

  const test = (e) => {
    e.preventDefault();
    props.getRecommend("11d262e4a57d46c2bc939449a43961c4");
  };

  // const getRecommend = (e) => {
  // 	// e.preventDefault();
  // 	props.getRecommend('11d262e4a57d46c2bc939449a43961c4');
  // 	// await axios
  // 	// 	.get(`http://localhost:7000/getRecommend/?id=${id}`)
  // 	// 	.then(function(response) {
  // 	// 		console.log(response.data, 'response.data 97 in Header');
  // 	// 		setDbCategories(response.data);
  // 	// 	})
  // 	// 	.catch(function(error) {
  // 	// 		console.log(error);
  // 	// 	});
  // 	// const value = e.target.value;
  // 	// setRating(value);

  // 	// setNumberRatings({ [e.target.name]: value });
  // 	// console.log(rating, 'rating in Header');
  // 	// console.log(rating, 'rating in Header');
  // 	// props.getTopPodcasts(value, 100);
  // };

  // console.log(rating, 'rating');
  // console.log(numberRatings, 'numberRatings');
  // console.log(genre, 'genre');
  // console.log(dbCategories, 'DB CATEGORIES BEFORE RETURN 115');
  console.log(category, "CATEGORY");
  return (
    <div>
      <div className="top-section">
        <h1 className="title">
          TOP PODCASTS -{" "}
          {category.toUpperCase() || "most popular".toUpperCase()}
        </h1>
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
        <div className="refine-header">
          <label>
            <p>Enter Min Rating</p>
            <input
              className="refine-input"
              type="text"
              name="rating"
              value={rating}
              onChange={handleRatingInput}
            />
          </label>
          <label>
            <p>Enter # of Ratings</p>
            <input
              className="refine-input"
              type="text"
              name="numberRatings"
              value={numberRatings}
              onChange={handleNumberRatingsInput}
            />
          </label>
          <div className="selection-box">
            <label>
              <p>Genre</p>
              <select id="selection" name="scripts" onChange={handleGenreInput}>
                {categoriesArray.map((item) => {
                  return (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </label>
            <button
              className="refine-button"
              type="submit"
              onClick={handleClick}
            >
              Submit
            </button>
            {/* <button className="refine-button" type="submit" onClick={test}>
							Test
						</button> */}
          </div>
        </div>
        {/* </fieldset> */}
      </form>
      {/* <input type="text">Enter Min Rating</input>
			<input type="text">Enter # of Ratings</input> */}
      <CardList
        topPodcasts={topPodcasts}
        podcasts={props}
        category={parseInt(value)}
        getData={props.getApiData}
        isLoading={props.isLoading}
        getRecommend={props.getRecommend}
        recommendations={props.recommendations}
      />
    </div>
  );
};

export default Header;
