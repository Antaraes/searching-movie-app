import { FC, ReactNode } from "react";
import { useAppSelector } from "../../redux/hook";
import { getAllMovies, getAllShows } from "../../redux/movies/movieSlice";
import MovieCard from "../MovieDetail/MovieCard";
import { Alert } from "@material-tailwind/react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
interface MovieListingProps {}
const MovieListing: FC<MovieListingProps> = () => {
  const movies = useAppSelector(getAllMovies);
  const isLoading = useAppSelector((state) => state.movies.isLoading);
  const shows = useAppSelector(getAllShows);
  let renderMovies: ReactNode = "";
  let renderShows: ReactNode = "";

  if (movies.Response === "True") {
    renderMovies = movies.Search.map((movie, index) => {
      if (isLoading) {
        return <Skeleton width={"200px"} />;
      } else {
        return <MovieCard key={index} data={movie} />;
      }
    });
  } else {
    renderMovies = <Alert>A simple alert for showing message.</Alert>;
  }
  if (shows.Response === "True") {
    renderShows = shows.Search.map((show, index) => {
      return <MovieCard key={index} data={show} />;
    });
  } else {
    renderShows = <Alert>A simple alert for showing message.</Alert>;
  }

  return (
    <>
      <div className="w-full movie-list">
        <h2>Movie</h2>
        <div className=" grid grid-cols-2 md:grid-cols-4 gap-3 movie-container ">
          {renderMovies}
        </div>
      </div>
      <div className="w-full movie-list">
        <h2>Shows</h2>
        <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 movie-container ">
          {renderShows}
        </div>
      </div>
    </>
  );
};

export default MovieListing;
