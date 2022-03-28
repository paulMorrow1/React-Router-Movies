import React, { useState, useEffect } from "react";
import axios from "axios";
import { Route, Link, Switch } from "react-router-dom";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";

import SavedList from "./Movies/SavedList";

export default function App() {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const getMovies = () => {
      axios
        .get("http://localhost:5001/api/movies") // Study this endpoint with Postman
        .then((response) => {
          // console.log("response: ", response.data);
          setMovieList(response.data);
          // Study this response with a breakpoint or log statements
          // and set the response data as the 'movieList' slice of state
        })
        .catch((error) => {
          console.error("Server Error", error);
        });
    };
    getMovies();
  }, []);

  const addToSavedList = (id) => {
    setSaved(id);
    console.log("ID: ", id);
    const savedMovie = movieList.map((movie) => {
      if (movie.id === id) {
        return movie;
      }
    });
    setSaved(savedMovie);
    // return movie;

    // This is stretch. Prevent the same movie from being "saved" more than once
  };

  return (
    <div>
      <SavedList
        list={
          [
            /* This is stretch */
          ]
        }
      />
      <Switch>
        <Route path={"/movie/:id"}>
          <Movie data={addToSavedList} />
        </Route>
        <Route path="/">
          <MovieList movies={movieList} />
        </Route>
      </Switch>
    </div>
  );
}
