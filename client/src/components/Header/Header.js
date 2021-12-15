import React, { useState, useContext } from "react";
import CardList from "../CardList/CardList";
import { array1, array2, categoriesArray } from "../../utils/category-list";
import { PodcastContext } from "../../context/PodcastContext";
import "./Header.css";

const Header = (props) => {
  const [state, setState] = useContext(PodcastContext);
  const [value, setValue] = useState("");
  const [category, setCategory] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
    setState({ page: 1, category: e.target.value });
    let findValue = Number(e.target.value);
    let findCategory = categoriesArray.find(
      (item) => item.id === findValue
    ).name;
    setCategory(findCategory);
    if (props.cache[0][`${e.target.value}`]) {
      props.renderCache(e.target.value);
    } else {
      props.getApiData(e.target.value, 1);
    }
  };

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
      <CardList
        podcasts={props}
        category={parseInt(value)}
        getData={props.getApiData}
        status={props.status}
        cache={props.cache}
      />
    </div>
  );
};

export default Header;
