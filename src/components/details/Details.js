import axios from "axios";
import React, { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { NavLink, useParams } from "react-router-dom";
import { ApiKey, baseURL, backDropURL } from "../api/Api";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { BiChevronLeft } from "react-icons/bi";
import noimage from "../../images/movies.jpg";

const Details = () => {
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState([]);
  const [castdata, setCastdata] = useState([]);
  const [genres, setGenres] = useState([]);
  const [video, setVideo] = useState([]);
  // const [type, setType] = useState([]);

  const params = useParams();
  const movieId = params.movieId;
  const types = params.type;

  const getDetails = async () => {
    setLoading(true);

    try {
      const { data } = await axios.get(
        `${baseURL}${types === "movie" ? "movie" : "tv"}/${movieId}${ApiKey}`
      );
      setDetails(data);
      setGenres(data.genres);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const getCast = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${baseURL}${
          types === "movie" ? "movie" : "tv"
        }/${movieId}/credits${ApiKey}`
      );
      setCastdata(data.cast);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getVideo = async () => {
    const { data } = await axios.get(
      `${baseURL}${
        types === "movie" ? "movie" : "tv"
      }/${movieId}/videos${ApiKey}`
    );
    setVideo(data.results);
    // console.log(data);
  };

  useEffect(() => {
    getDetails();
    getVideo();
    getCast();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mt-0 mb-0 md:pl-[15rem] bg-[#10141e] ">
      {loading ? (
        <TailSpin width={50} radius={1} color="pink" />
      ) : (
        <>
          <NavLink to={"/"}>
            <BiChevronLeft className="fixed z-10 text-4xl text-black bg-white m-3 md:m-5 rounded-full hover:bg-gray-600 hover:text-gray-50" />
          </NavLink>
          {/* poster */}
          <div className="relative h-auto md:h-[82vh] flex justify-center top-0">
            <div className="h-full w-full shadowbackdrop absolute"></div>
            <h1 className="text-white absolute bottom-0 p-10 text-2xl md:text-6xl font-bold text-center">
              {details.title || details.name}
            </h1>
            {details.backdrop_path === null ? (
              <img src={noimage} alt="poster" className="h-full w-full" />
            ) : (
              <img
                src={backDropURL + details.backdrop_path}
                alt="poster"
                className="h-full w-full"
              />
            )}
          </div>

          {/* overview */}
          <h3 className="pb-4 pt-8 text-gray-300 text-center  px-3 md:px-60 font-Roboto text-sm md:text-[15px] leading-relaxed">
            {details.overview}
          </h3>

          <div className="text-blue-100  my-3 flex justify-center">
            <h2 className="bg-blue-600/30 border-2 border-blue-700 p-2 px-3 rounded-full text-xs md:text-sm font-normal">
              Release Date :{" "}
              <span className="pl-2 text-sm md:text-base font-semibold">
                {details.release_date || details.first_air_date}
              </span>
            </h2>
          </div>

          {/* tag */}
          <div className="flex justify-center flex-wrap gap-x-2 gap-y-4">
            {genres.map((tag) => (
              <div key={tag.id}>
                <div className="text-sm md:text-base text-white font-semibold bg-gray-800 rounded-full px-4 py-1">
                  {tag.name}
                </div>
              </div>
            ))}
          </div>

          {/* cast */}
          <div className="flex flex-col items-center pt-6">
            <h3 className="text-5xl text-blue-300 font-semibold text-center">
              Cast
            </h3>

            <div
              className="px-2 md:px-5 flex flex-row py-10 max-w-full flex-start overflow-x-auto relative
              scrollbar-thin scrollbar-thumb-gray-500/20 scrollbar-track-gray-900/90 md:pb-3 "
            >
              {castdata.map((cast) => (
                <div key={cast.id}>
                  {cast.profile_path !== null ? (
                    <>
                      <div className="flex min-w-[6rem] md:min-w-[10rem] max-w-[9rem] md:max-w-[10rem] h-full items-center text-center flex-col mx-2 md:mx-1 hover:-translate-y-4 transition-all duration-150 ease-in">
                        <LazyLoadImage
                          effect="blur"
                          src={
                            "https://image.tmdb.org/t/p/w500" +
                            cast.profile_path
                          }
                          className="w-full h-full rounded-xl"
                        />
                        <p className="text-white text-sm md:text-base">{cast.name}</p>
                        <p className="text-blue-300 text-xs md:text-sm">({cast.character})</p>
                      </div>
                    </>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          {/* trailer */}
          <div className="flex justify-center items-center py-10 gap-y-5 md:gap-y-10 flex-wrap">
            {video.map((trail) => (
              <div key={trail.id}>
                {trail.type === "Trailer" ? (
                  <div className="md:w-[60vw] md:h-[70vh] drop-shadow-lg flex">
                    <iframe
                      key={trail.id}
                      src={"https://www.youtube.com/embed/" + trail.key}
                      title="trailer"
                      width="100%"
                      height="100%"
                      allowFullScreen
                      className=" rounded-md"
                    />
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Details;
