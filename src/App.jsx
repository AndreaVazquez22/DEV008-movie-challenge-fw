import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import "./App.css";
import { Movie } from "./components/Movie";
import { Generos } from "./components/Generos";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [movie, setMovie] = useState([]);
  const [trailer, setTrailer] = useState([]);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const url = "https://api.themoviedb.org/3";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YjJlOWNlMWJiMGFjZWFkMTAzZWZmNWU1ODVlZDRmNyIsInN1YiI6IjY1MDllYmZlODFjN2JlMDEwMDUyM2FkOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ki0GbIAf7oOBb6F1UmFnj9rzpZ3AIKYrzPJApB56FFc",
      },
    };
    // el valor type depende si searchKey tiene un valor es search y si no es discover
    const type = searchKey ? "search" : "discover";
    //llamada a la api, url dinamica cambia si buscamos algo y options que es metodo y la apikey
    fetch(`${url}/${type}/movie?query=${searchKey}`, options)
      //respuesta a la promesa trae la informacion o la data (json)
      // res = respuesta solicitud HTTP y se convierte en json con el metodo .json
      .then((res) => res.json())
      //se usa json para mostrar los resultados de las películas al momento de almacenarse en el array setMovies
      .then((json) => {
        console.log(json.results);
        // se usa setMovies para actualizar el estado del resultado de la búsqueda
        setMovies(json.results);
        //actualiza el estado con la primer película del array
        setMovie(json.results[0]);

        if (json.results.length) {
          fetchMovie(json.results[0].id);
        }
      })
      .catch((err) => console.error("error:" + err));
    //No se deja vacio porque el efecto se va a volver a ejecutar cada vez que searchKey cambie
  }, [searchKey]);

  const fetchMovie = (id) => {
    const url = "https://api.themoviedb.org/3";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YjJlOWNlMWJiMGFjZWFkMTAzZWZmNWU1ODVlZDRmNyIsInN1YiI6IjY1MDllYmZlODFjN2JlMDEwMDUyM2FkOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ki0GbIAf7oOBb6F1UmFnj9rzpZ3AIKYrzPJApB56FFc",
      },
    };

    fetch(`${url}/movie/${id}?append_to_response=videos`, options)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if (json.videos && json.videos.results) {
          const trailer = json.videos.results.pop();
          setTrailer(trailer ? trailer : json.videos.results[0]);
        }
        setMovie(json);
      })
      .catch((err) => console.error("error:" + err));
  };
  const selectMovie = (movie) => {
    fetchMovie(movie.id);
    setMovie(movie);
    window.scrollTo(0, 0);
  };

  const searchMovies = (e) => {
    e.preventDefault();
    setSearchKey;
  };

  const getGenre = (genre) => {
    const url = "https://api.themoviedb.org/3";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YjJlOWNlMWJiMGFjZWFkMTAzZWZmNWU1ODVlZDRmNyIsInN1YiI6IjY1MDllYmZlODFjN2JlMDEwMDUyM2FkOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ki0GbIAf7oOBb6F1UmFnj9rzpZ3AIKYrzPJApB56FFc",
      },
    };
    fetch(`${url}/discover/movie?with_genres=${genre}`, options)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setMovies(json.results);
        setMovie(json.results[0]);

        if (json.results.length) {
          fetchMovie(json.results[0].id);
        }
      })
      .catch((err) => console.error("error:" + err));
  };

  return (
    <>
      <div>
        <style>
          {`@import url("https://fonts.googleapis.com/css2?family=Playfair+Display+SC&family=Poppins&display=swap");`}
        </style>
        <h2 className="title-page"> Cinema Movies🎬</h2>
        <form className="form-search" onSubmit={searchMovies}>
          <input
            className="input-search"
            type="text"
            placeholder="Busqueda"
            onChange={(e) => setSearchKey(e.target.value)}
          />
          <button className="btn-search">Búsqueda</button>
        </form>

        <Generos onChangeGenre={getGenre} />

        <div>
          <main>
            {movie ? (
              <div
                className="info-movie"
                style={{
                  backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
                }}
              >
                {playing ? (
                  <div className="playing">
                    <h1 className="text-title">{movie.title}</h1>
                    <p className="text-descrip">{movie.overview}</p>

                    {trailer ? (
                      <button
                        className="btn-play-trailer"
                        onClick={() => setPlaying(false)}
                        type="button"
                      >
                        Play Trailer
                      </button>
                    ) : (
                      "Trailer no disponible"
                    )}
                  </div>
                ) : (
                  <>
                    <YouTube
                      videoId={trailer.key}
                      className="reproductor-container"
                      opts={{
                        width: "100%",
                        height: "100%",
                        playerVars: {
                          autoplay: 1,
                          controls: 0,
                          cc_load_policy: 0,
                          fs: 0,
                          iv_load_policy: 0,
                          modestbranding: 0,
                          rel: 0,
                          showinfo: 0,
                        },
                      }}
                    />
                    <button
                      onClick={() => setPlaying(true)}
                      className="btn-close"
                    >
                      Cerrar
                    </button>
                  </>
                )}
              </div>
            ) : (
              <>
                <div className="no-movie">No se encontró ninguna película.</div>
              </>
            )}
          </main>
        </div>

        <div className="container_movies">
          {movies.map((movie, index) => {
            return (
              <div
                className="movie"
                key={index}
                onClick={() => selectMovie(movie)}
              >
                <Movie
                  title={movie.title}
                  link={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
