/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ApiKey, baseURL, discoverMoviesApi, imgURL } from "../api/Api";
import Card from "../card/Card";
import Pagination from "../pagination/CustomPagination";
import { TailSpin } from "react-loader-spinner";
import Genres from "../genres/Genres";
import useGenre from "../../hooks/UseGenre";

const Movies = () => {
  const [discover, setDiscover] = useState([]);
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState();
  const [loading, setLoading] = useState(false);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const genreforURL = useGenre(selectedGenres);

  const fetchDiscover = async () => {
    setLoading(true);
    try {
      // const { data } = await axios.get(`${baseURL}discover/movie/${ApiKey}&page=${page}&with_genres=${genreforURL}`);
      const { data } = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=e295eed65e79351299973af64e4b6832&page=${page}&with_genres=${genreforURL}`);
      setDiscover(data.results);
      setNumOfPages(data.total_pages);
      // console.log(data)
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDiscover();
  }, [genreforURL,page]);

  return (
    <div className="md:pl-[18rem]  flex flex-col justify-center items-center w-full md:mt-12 px-4 md:px-10">
      <h3 className="text-gray-100 text-center text-5xl font-thin mb-4 md:mb-10 mt-5">
        DISCOVER MOVIES
      </h3>

      <div  className="mb-4">
        <Genres
          type="movie"
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
          genres={genres}
          setGenres={setGenres}
          setPage={setPage}
        />
      </div>

      <div className="flex justify-between items-center flex-wrap gap-y-16 mb-6">
        {loading ? (
          <TailSpin width={50} radius={1} color="pink" />
        ) : (
          <>
            {discover.map((movie) => (
              <Card
                key={movie.id}
                id={movie.id}
                poster={imgURL + movie.poster_path}
                title={movie.title || movie.name}
                mediaType={movie.media_type}
                releaseDate={movie.release_date || movie.first_air_date}
                rating={movie.vote_average}
                type='movie'
              />
            ))}
          </>
        )}
      </div>
      <Pagination setPage={setPage} numOfPages={numOfPages} />
    </div>
  );
};

export default Movies;
