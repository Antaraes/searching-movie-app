import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import movieApi from "../../api/movieApi";
import { APIKey } from "../../api/MovieApiKey";
import { RootState } from "../store";
import { SearchMovies } from "../../components/MovieDetail/MovieCard";
export const fetchAsyncMovies = createAsyncThunk(
  "movie/fetchAyncMovies",
  async (term: string = "Genius") => {
    try {
      const response = await movieApi.get(`?apikey=${APIKey}&s=${term}&type=movie`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);
interface MovieState {
  movies: { Response: string; Search: SearchMovies[] };
  shows: { Response: string; Search: SearchMovies[] };
  details: { Response: string };
  isLoading: boolean;
}

const initialState: MovieState = {
  movies: { Response: "", Search: [] },
  shows: { Response: "", Search: [] },
  details: { Response: "" },
  isLoading: false,
};

export const fetchAsyncShow = createAsyncThunk(
  "movie/fetchAyncShow",
  async (term: string = "ww2") => {
    try {
      const response = await movieApi.get(`?apikey=${APIKey}&s=${term}&type=series`);
      console.log(response.data);

      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const fetchAsyncShowDetail = createAsyncThunk(
  "movie/fetchAyncShowDetail",
  async (id: string) => {
    try {
      const response = await movieApi.get(`?apikey=${APIKey}&i=${id}&Plot=full`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    addMovies: (state, { payload }) => {
      state.movies = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncMovies.pending, (state) => {
        state.isLoading = true;
        console.log("pending");
      })
      .addCase(fetchAsyncShow.pending, (state) => {
        state.isLoading = true;
        console.log("pending");
      })
      .addCase(fetchAsyncShowDetail.pending, (state) => {
        state.isLoading = true;
        console.log("pending");
      })
      .addCase(fetchAsyncMovies.fulfilled, (state, action) => {
        console.log("Fetch Success");

        return { ...state, movies: action.payload, isLoading: false };
      })
      .addCase(fetchAsyncMovies.rejected, () => {
        console.log("Fetch Failure");
      })
      .addCase(fetchAsyncShow.fulfilled, (state, action) => {
        console.log("Fetch Success");

        return { ...state, shows: action.payload };
      })
      .addCase(fetchAsyncShowDetail.fulfilled, (state, action) => {
        console.log("Fetch Success");

        return { ...state, details: action.payload };
      });

    // [fetchAsyncMovies.pending]:()=>(
    //   console.log('pennding')

    // ),
    // [fetchAsyncMovies.fulfilled]:(status,{payload})=>{
    //   console.log('Fetched Success');
    //   return[...state,movies:payload]

    // }
  },
});

export const { addMovies } = movieSlice.actions;
export const getAllMovies = (state: RootState) => state.movies.movies;
export const getAllShows = (state: RootState) => state.movies.shows;
export const getAllShowDetail = (state: RootState) => state.movies.details;
export default movieSlice.reducer;
