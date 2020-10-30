import React,{useState, useEffect} from 'react';
import {Link, BrowserRouter as Router, Route} from 'react-router-dom';

const HomePage = ()=> {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] =useState();
  
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
            return <h2 key = {index}>{planet.name}</h2>
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
      </Router>
    </div>
  )
}
export default App;