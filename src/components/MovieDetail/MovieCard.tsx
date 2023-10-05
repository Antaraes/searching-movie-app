import { FC } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
interface MovieCardProps {
  data: {
    Poster: string;
    Title: string;
    Year: string;
    imdbID: string;
  };
}
import { Link } from "react-router-dom";

const MovieCard: FC<MovieCardProps> = ({ data }) => {
  return (
    <Card className="mt-6 w-80">
      <CardHeader color="blue-gray" className="relative h-56">
        <img src={data.Poster} alt="card-image" className=" object-fill" />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {data.Title}
        </Typography>

        <h2>{data.Year}</h2>
      </CardBody>
      <CardFooter className="pt-0">
        <Link to={`/movie/${data.imdbID}`}>
          <Button className=" hover:bg-blue-gray-50 hover:text-black transition-all duration-300 ease-in-out">
            View More
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default MovieCard;
