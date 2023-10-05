import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useAppDispatch } from "../../redux/hook";
import { fetchAsyncShowDetail } from "../../redux/movies/movieSlice";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
interface MovieInfo {
  Actors: string;
  Awards: string;
  BoxOffice: string;
  Country: string;
  Dvd: string;
  Director: string;
  Genre: string;
  Language: string;
  Metascore: string;
  Plot: string;
  Poster: string;
  Production: string;
  Rated: string;
  Ratings: { Source: string; Value: string }[];
  Released: string;
  Response: string;
  Runtime: string;
  Title: string;
  Type: string;
  Website: string;
  Writer: string;
  Year: string;
  imdbID: string;
  imdbRating: string;
  imdbVotes: string;
}

interface MovieDetailProps {}

const MovieDetail: FC<MovieDetailProps> = () => {
  const [data, setData] = useState<MovieInfo | null>(null);
  const { imdbID } = useParams<{ imdbID: string }>();

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const result = await dispatch(fetchAsyncShowDetail(imdbID));
      setData(result.payload);
      console.log(data);
    };

    fetchData();
  }, [dispatch, imdbID]);

  if (!data) {
    return <Skeleton count={5} />;
  }
  return (
    <div className="flex p-10 justify-between items-center">
      <img
        alt="Movie Poster"
        className="lg:w-1/3 w-full object-cover object-center rounded border border-gray-200"
        src={data.Poster}
      />
      <div className="lg:w-2/3 pl-8">
        <h2 className="text-2xl font-bold mb-4">{data.Title}</h2>
        <p className="text-gray-700 mb-4">{data.Plot}</p>
        <p>
          <span className="font-bold">Director:</span> {data.Director}
        </p>
        <p>
          <span className="font-bold">Actors:</span> {data.Actors}
        </p>
        <p>
          <span className="font-bold">Genre:</span> {data.Genre}
        </p>
        <p>
          <span className="font-bold">Language:</span> {data.Language}
        </p>
        <p>
          <span className="font-bold">Rated:</span> {data.Rated}
        </p>
        <p>
          <span className="font-bold">Released:</span> {data.Released}
        </p>
        <p>
          <span className="font-bold">Runtime:</span> {data.Runtime}
        </p>
        <p>
          <span className="font-bold">IMDb Rating:</span> {data.imdbRating}
        </p>
      </div>
    </div>
  );
};

export default MovieDetail;
