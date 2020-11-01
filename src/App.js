import React, { useState, useEffect } from "react";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

const PersonPage = ({ match }) => {
  const {
    params: { planetId },
  } = match;
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    fetch(`https://swapi.dev/api/planets/${planetId}`, {})
      .then((res) => res.json())
      .then((response) => {
        setData(response)
        setIsLoading(false);
        console.log(`https://swapi.dev/api/planets/${planetId}`);
      })
      .catch((error) => console.log(error));
  }, [planetId]);

  return (
    <>
      {!isLoading && (
        <>
          <h2>{data.name}</h2>
          <p>{data.rotation_period}</p>
          <p>{data.diameter}</p>
          <p>{data.climate}</p>
          <p>{data.gravity}</p>
          <p>{data.terrain}</p>
          <p>{data.population}</p>
          <p>{data.residents.map(residents => <p>{residents}</p>)}</p>

          <Link to="/">Back to homepage</Link>
        </>
      )}
    </>
  );
};

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    fetch("https://swapi.dev/api/planets/", {})
      .then((res) => res.json())
      .then((response) => {
        setData(response.results);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      {!isLoading &&
        data.map((planet, index) => {
          return (
            <h5 key={index}>
              <Link to={`/planet/${index + 1}`}>{planet.name}'s Page</Link>
            </h5>
          );
        })}
    </>
  );
};

const App = () => {
  return (
    <>
      <Router>
        <Route exact path="/" component={HomePage} />
        <Route path="/planet/:planetId" component={PersonPage} />
      </Router>
    </>
  );
};

export default App;
