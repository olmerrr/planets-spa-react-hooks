import React,{useState, useEffect} from 'react';
import {Link, BrowserRouter as Router, Route} from 'react-router-dom';

const PlanetPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState();

    useEffect(() => {
      fetch(`https://swapi.dev/api/planets/${planetId}`, {})
      .then((res)=> res.json())
      .then((response)=> {
        setData(response);
        setIsLoading(false);
        console.log(`https://swapi.dev/api/planets/${planetId}`)
      })
      .catch((error) => console.log(error))
    },[planetId]);
  
    return(
      <div>
        {isLoading && (
          <div>
            <h2>{data.name}</h2>
            <p>{data.rotation_period}</p>
            <p>{data.diameter}</p>
            <p>{data.climate}</p>
            <p>{data.gravity}</p>
            <p>{data.terrain}</p>
            <p>{data.population}</p>
            <p>{data.residents}</p>

          <Link  to="/">Go back to Home Page</Link>
          </div>
        )}
      </div>
    )
}

const HomePage = ()=> {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  
  useEffect( () =>{
    fetch('https://swapi.dev/api/planets/', {})
      .then((res) => res.json())
      .then((response) => {
        setData(response.results);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      {
        !isLoading && 
          data.map((planet, index) => {
            return <h2 key = {index}>
              <Link to = {`/planet/${index + 1}`}>{planet.name}</Link>
              </h2>
          })
      }
    </div>
  )
}
const App = () => {
  return (
    <div>
      <Router>
        <Route exact path = "/" component = {HomePage}/>
        <Route exact path = "/planet/:planetId" component = {PlanetPage}/>

      </Router>
    </div>
  )
}
export default App;