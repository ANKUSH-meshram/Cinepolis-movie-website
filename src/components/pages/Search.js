import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import axios from "axios";
import { ApiKey, imgURL } from "../api/Api";
import Card from "../card/Card";
import { Tab, Tabs } from "@mui/material";
import Pagination from "../pagination/CustomPagination";
import { TailSpin } from "react-loader-spinner";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  const [type, setType] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const [loading, setLoading] = useState(false);

  const fetchSearch = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${
          type ? "tv" : "movie"
        }${ApiKey}&language=en-US&query=${searchText}&page=${page}&include_adult=false`
      );
      setContent(data.results);
      setNumOfPages(data.total_pages);
      // console.log(data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      fetchSearch();
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
    // eslint-disable-next-line
  }, [type, page]);

  return (
    <div className="md:pl-[18rem] mt-4 px-4 md:px-10 flex flex-col justify-center items-center w-full">
      <div className="self-start w-full flex justify-between gap-x-2 md:gap-x-5 mb-4">
        {/* <TextField
          placeholder="Search Movies or Series"
          className="w-[95%] drop-shadow-md"
          label="Search"
          variant="filled"
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={handleKeyPress}
        /> */}
        <TextField placeholder="Search Movies or Series"
          className="w-[95%] drop-shadow-md"
          label="Search"
          variant="filled"
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={handleKeyPress}/>
        <button
          onClick={fetchSearch}
          variant="contained"
          className=" bg-blue-700 px-4 text-gray-300  rounded hover:bg-blue-800"
        >
          <FaSearch size={24}/>
        </button>
      </div>

      <Tabs
        className="mb-4 self-start w-full"
        value={type}
        indicatorColor="primary"
        textColor="primary"
        onChange={(event, newValue) => {
          setType(newValue);
          setPage(1);
        }}
        style={{ paddingBottom: 5 }}
        aria-label="disabled tabs example"
      >
        <Tab
          style={{ width: "45%", fontWeight: "bold" }}
          label="Search Movies"
        />
        <Tab
          style={{ width: "45%", fontWeight: "bold" }}
          label="Search TV Series"
        />
      </Tabs>

      <div className="flex justify-between items-center flex-wrap gap-y-20 mb-6">
        {loading ? (
          <TailSpin width={50} radius={1} color="pink" />
        ) : (
          <>
            {content.map((e) => (
              <Card
                id={e.id}
                key={e.id}
                type= {(type===0 )? "movie":"tv"} 
                poster={imgURL + e.poster_path}
                title={e.title || e.name}
                mediaType={e.media_type}
                releaseDate={e.release_date || e.first_air_date}
                rating={e.vote_average}
              />
            ))}
          </>
        )}
      </div>

      {numOfPages > 1 && (
        <Pagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default Search;
