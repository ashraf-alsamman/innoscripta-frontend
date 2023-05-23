import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_BASE_URL from '../config/config';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

interface RegistrationResponse {
  user: User;
  token: string;
}

interface User {
  name: string;
  email: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: { email: string; password: string }) => {
    try {
      const response = await axios.post(API_BASE_URL+"api/login", credentials);
      const { user, token } = response.data;
      console.log(token);

      return { user, token };
    } catch (error: any) {
      console.log(error.response.data);
      alert("Login failed");
      throw new Error("Login failed");
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (userData: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }) => {
    try {
      const response = await axios.post<RegistrationResponse>(
        API_BASE_URL+"api/register",
        userData,
        {
          headers: {
            "X-CSRF-TOKEN":
              document
                .querySelector('meta[name="csrf-token"]')
                ?.getAttribute("content") || "",
          },
        }
      );

      const { user, token } = response.data;
      return { user, token };
    } catch (error) {
      alert("Registration failed");
      throw new Error("Registration failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token; // Access the token value correctly
    },
    clearToken: (state) => {
      state.token = null;
      state.isAuthenticated=false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Login failed";
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Registration failed";
      });
  },
});

const persistedAuthSlice = authSlice.reducer;

export const { setToken, clearToken } = authSlice.actions;
export default persistedAuthSlice;
export const selectAuth = (state: any) => state.auth;
