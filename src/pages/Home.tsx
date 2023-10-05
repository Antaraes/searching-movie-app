import { FC, useEffect } from "react";

import MovieListing from "../components/MovieListing/MovieListing";

import { useAppDispatch } from "../redux/hook";
import { fetchAsyncMovies, fetchAsyncShow } from "../redux/movies/movieSlice";
interface HomeProps {}

const Home: FC<HomeProps> = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAsyncMovies());
    dispatch(fetchAsyncShow());
  }, []);
  return (
    <div className="  overflow-x-hidden max-w-screen-3xl ">
      <MovieListing />
    </div>
  );
};

export default Home;
