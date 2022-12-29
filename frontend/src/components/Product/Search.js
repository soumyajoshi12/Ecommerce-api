import { React, Fragment, useState } from "react";
import "./Search.css"

const Search = ({ history }) => {
  const [keyowrd, setKeyword] = useState("");

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyowrd.trim()) {
      history.push(`/products/${keyowrd}`);
    } else {
      history.push("/products");
    }
  };

  return (
    <Fragment>
      <from className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search a Product ..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </from>
    </Fragment>
  );
};

export default Search;
