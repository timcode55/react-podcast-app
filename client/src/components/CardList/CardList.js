import React from "react";
import "./CardList.css";
import Card from "../Card/Card";
import Arrow from "../arrow/Arrow";

const CardList = (props) => {
  console.log(props.podcasts, "PROPS.PODCASTS IN CARDLIST***");
  return (
    <div className="outer-container">
      <div className="container">
        <div className="podcast-display">
          {}
          {props.podcasts.podcasts[0] ? (
            props.podcasts.podcasts[0].map((pod) => (
              <Card key={pod.id} podcast={pod} />
            ))
          ) : (
            <div id="preloader">
              <div id="loader" />
            </div>
          )}
        </div>
      </div>
      {props.podcasts.podcasts[0] ? <Arrow getData={props.getData} /> : null}
    </div>
  );
};

export default CardList;
