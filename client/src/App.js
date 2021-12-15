import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./App.css";
import Header from "./components/Header/Header";
import { PodcastContext } from "./context/PodcastContext";

let cacheObject = {},
  cacheArray = [];

function App() {
  const [podcasts, setPodcasts] = useState([]);
  const [genre, setGenre] = useState("");
  const [state, setState] = useContext(PodcastContext);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!genre) {
      getApiData(67);
      setState({ page: 1, category: 67 });
      cacheObject["67"] = getApiData(67) || [];
      cacheArray.push(cacheObject);
      setGenre("67");
    } else {
      getApiData();
    }
  }, []);

  const renderCache = async (genreId) => {
    const data = cacheArray[0][`${genreId}`];
    await setPodcasts([data]);
    localStorage.setItem("podcasts", data[0][0]);
  };

  const getApiData = async (genreId, page) => {
    setStatus("loading");
    await fetch(
      `https://listen-api.listennotes.com/api/v2/best_podcasts?genre_id=${genreId}&page=${page}&region=us&safe_mode=0`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-ListenAPI-Key": process.env.REACT_APP_LISTEN_NOTES_API_KEY
        },
        credentials: "same-origin"
      }
    ).then((response) => {
      response.json().then((data) => {
        const getRating = async () => {
          for (let pod of data.podcasts) {
            const id = pod.id;
            await axios
              .get(`https://podreact.timpetrvalsky.com/findId/?data=${id}`)
              .then(function (response) {
                pod["rating"] = response.data.rating;
                pod["numberOfRatings"] = response.data.numberOfRatings || "N/A";
                pod["itunes"] = response.data.itunes;
                // pod['description'] = response.data.description;
              })
              .catch(function (error) {
                console.log(error);
              });
          }
          cacheObject[genreId] = data.podcasts || [];
          await setGenre(genreId);
          await setPodcasts([data.podcasts]);

          setStatus("loaded");
        };
        getRating();
      });
    });
  };
  return (
    <Header
      podcasts={podcasts}
      getApiData={getApiData}
      renderCache={renderCache}
      cache={cacheArray}
      status={status}
    />
  );
}

export default App;
