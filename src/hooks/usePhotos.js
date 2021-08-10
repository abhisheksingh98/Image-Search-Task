import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../services";
import  {jsonParse}  from "../utils/jsonParse";

const usePhotos = () => {
  const [photos, setPhotos] = useState([]);
  const [status, setStatus] = useState("idle");
  const [pgNo, setPgNo] = useState(2);

  const [variant, setVariant] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");

  const getPhotos = async () => {
    try {
      const response = await axios.get(API_URL + "flickr.photos.getRecent");
      if (response.status === 200) {
        const parsedResponse = jsonParse(response.data);
        setPhotos(parsedResponse.photos.photo);
        setStatus("resolved");
      }
    } catch (error) {
      // console.error(error);
      setStatus("rejected");
    }
  };

  const getNextPage = async () => {
    try {
      let url = API_URL + "flickr.photos.getRecent" + `&page=${pgNo}`;
      const response = await axios.get(url);

      if (response.status === 200) {
        const parsedResponse = jsonParse(response.data);
        setPhotos((prevState) => {
          return [...prevState, ...parsedResponse.photos.photo];
        });
        setStatus("resolved");
        setPgNo((no) => no + 1);
      }
    } catch (error) {
      setStatus("rejected");
    }
  };

  const getNextSearchPage = async () => {
    try {
      const response = await axios.get(
        API_URL +
          "flickr.photos.search" +
          `&text=${searchQuery}` +
          `&page=${pgNo}`
      );
      if (response.status === 200) {
        const parsedResponse = jsonParse(response.data);
        setPhotos((prevState) => {
          return [...prevState, ...parsedResponse.photos.photo];
        });
        setStatus("resolved");
        setPgNo((no) => no + 1);
      }
    } catch (error) {
      setStatus("rejected");
    }
  };

  const getSearchResults = async (query) => {
    setStatus("pending");
    try {
      const response = await axios.get(
        API_URL + "flickr.photos.search" + `&text=${query}`
      );
      if (response.status === 200) {
        const parsedResponse = jsonParse(response.data);
        setPhotos(parsedResponse.photos.photo);
        setStatus("resolved");
        setVariant("search");
      }
    } catch (error) {
      setStatus("rejected");
    }
  };

  useEffect(() => {
    setStatus("pending");
    getPhotos();
  }, []);
  return {
    status,
    photos,
    getNextPage,
    getNextSearchPage,
    searchQuery,
    setSearchQuery,
    getSearchResults,
    variant,
  };
};

export default usePhotos;
