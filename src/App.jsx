import  React, { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Movie } from "./components/Movie";
import fetch from "node-fetch";

function App() {
  const [count, setCount] = useState(0);
  const [movies, setMovies]= useState([]);
  useEffect(() => {
    const url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YjJlOWNlMWJiMGFjZWFkMTAzZWZmNWU1ODVlZDRmNyIsInN1YiI6IjY1MDllYmZlODFjN2JlMDEwMDUyM2FkOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ki0GbIAf7oOBb6F1UmFnj9rzpZ3AIKYrzPJApB56FFc'
  }
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));
    
    /*fetch('http://www.omdbapi.com/?i=tt3896198&apikey=5ea33f23')
      .then((response) => {
        if (!response.ok) {
          throw new Error('La solicitud no fue exitosa');
        }
        return response.json(); 
      })
      .then((data) => {
      console.log([data])
        setMovies([data]);
      })
      .catch((error) => {
        console.error('Error al obtener datos de la API:', error);
      });*/
  }, []); 
    
    

  return (
    <>
      <div>
        <ul>
          {movies.map((movie, index) => {
           return <li key={index}>
              <p>{movie.title}</p>
              <img src={movie.link} />
            </li>;
          })};
        
        </ul>


        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
