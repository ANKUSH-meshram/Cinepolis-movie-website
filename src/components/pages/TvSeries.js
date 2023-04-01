/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { discoverSeriesApi, imgURL } from "../api/Api";
import Card from "../card/Card";
import Pagination from "../pagination/CustomPagination";
import { TailSpin } from "react-loader-spinner";
import Genres from "../genres/Genres";
import useGenre from "../../hooks/UseGenre";

const Home = () => {
  const [series, setSeries] = useState([]);
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState();
  const [loading, setLoading] = useState(false);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const genreforURL = useGenre(selectedGenres);

  const fetchSeries = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${discoverSeriesApi}&page=${page}&with_genres=${genreforURL}`);
      setSeries(data.results);
      setNumOfPages(data.total_pages);
      // console.log(data)
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSeries();
  }, [genreforURL,page]);

  return (
    <div className="md:pl-[18rem] flex flex-col justify-center items-center w-full mt-4 px-4 md:px-10">
      <h3 className="text-gray-100 text-center text-5xl font-thin mb-5 md:mb-10 mt-5">
        DISCOVER SERIES
      </h3>

      <div className="mb-5">
        <Genres
          type="tv"
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
            {series.map((e) => (
              <Card
                poster_path= {e.poster_path}
                key={e.id}
                id={e.id}
                poster={imgURL + e.poster_path}
                title={e.title || e.name}
                mediaType={e.media_type}
                releaseDate={e.release_date || e.first_air_date}
                rating={e.vote_average}
                type='tv'
              />
            ))}
          </>
        )}
      </div>
      <Pagination setPage={setPage} numOfPages={numOfPages} />
    </div>
  );
};

export default Home;
