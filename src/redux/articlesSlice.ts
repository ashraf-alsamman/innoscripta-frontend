import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async (filters: object) => {
    try {
      const response = await axios.get("/api/articles", { params: filters });
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch articles");
    }
  }
);

export const fetchMyArticles = createAsyncThunk(
  "preferences/fetchMyArticles",
  async (_, { getState }) => {
    try {
      const auth = (getState() as any).auth; // Retrieve the auth state from Redux store
      const token = auth.token; // Access the token value
      const response = await axios.post("/api/articles/my", null, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });

      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch my articles");
    }
  }
);

const articlesSlice = createSlice({
  name: "articles",
  initialState: {
    articles: { data: [] },
    myArticles: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch articles";
      })

      .addCase(fetchMyArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.myArticles = action.payload;
      })
      .addCase(fetchMyArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch articles";
      });
  },
});

export default articlesSlice.reducer;
export const selectPreferences = (state: any) => state.articles;

