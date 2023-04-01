/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { imgURL, TrendingApi } from "../api/Api";
import Card from "../card/Card";
import Pagination from "../pagination/CustomPagination";
import { TailSpin } from "react-loader-spinner";

const Home = () => {
  const [trending, setTrending] = useState([]);
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState();
  const [loading, setLoading] = useState(false);

  const fetchTrending = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${TrendingApi}&page=${page}`);
      setTrending(data.results);
      setNumOfPages(data.total_pages);
      // console.log(data)
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTrending();
  }, [page]);

  return (
    <div className="md:pl-[18rem] flex flex-col justify-center items-center w-full mt-4 px-4 md:px-10">
      <h3 className="text-gray-100 text-center text-5xl font-thin mb-10 mt-5 ">
        Trending Today
      </h3>

      <div className="flex justify-between items-center flex-wrap gap-y-20">
        {loading ? (
          <TailSpin width={50} radius={1} color="pink" />
        ) : (
          <>
            {trending.map((e) => (
              <Card
                key={e.id}
                id={e.id}
                poster={imgURL + e.poster_path}
                title={e.title || e.name}
                type={e.media_type}
                releaseDate={e.release_date || e.first_air_date}
                rating={e.vote_average}
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
