import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import movieApi from "../../api/movieApi";
import { APIKey } from "../../api/MovieApiKey";
import { RootState } from "../store";
export const fetchAsyncMovies = createAsyncThunk(
  "movie/fetchAyncMovies",
  async (term: string = "Genius") => {
    const response = await movieApi
      .get(`?apikey=${APIKey}&s=${term}&type=movie`)
      .catch((err) => console.log(err));
    return response.data;
  }
);
const initialState = {
  movies: {},
  shows: {},
  details: {},
  isLoading: false,
};

export const fetchAsyncShow = createAsyncThunk(
  "movie/fetchAyncShow",
  async (term: string = "ww2") => {
    const response = await movieApi
      .get(`?apikey=${APIKey}&s=${term}&type=series`)
      .catch((err) => console.log(err));
    return response.data;
  }
);

export const fetchAsyncShowDetail = createAsyncThunk("movie/fetchAyncShowDetail", async (id) => {
  const response = await movieApi
    .get(`?apikey=${APIKey}&i=${id}&Plot=full`)
    .catch((err) => console.log(err));
  return response.data;
});

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
