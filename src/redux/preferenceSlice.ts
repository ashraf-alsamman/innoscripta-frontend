import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPreferences = createAsyncThunk(
    'preferences/fetchPreferences',
    async (_, { getState   }) => {
      try {
        const auth  = (getState() as any).auth  ; // Retrieve the auth state from Redux store
        const token = auth.token; // Access the token value
  
        const response = await axios.post('api/preference/get/all', null, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        });
  
        return response.data;
      } catch (error) {
        throw new Error('Failed to fetch preferences');
      }
    }
  );

  
  export const fetchMyPreferences = createAsyncThunk(
    'preferences/fetchMyPreferences',
    async (_, { getState   }) => {
      try {
        const auth  = (getState() as any).auth  ; // Retrieve the auth state from Redux store
        const token = auth.token; // Access the token value
  
        const response = await axios.post('/api/preference/get', null, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        });
  
        return response.data;
      } catch (error) {
        throw new Error('Failed to fetch my preferences');
      }
    }
  );


  export const savePreferences = createAsyncThunk(
    'preferences/savePreferences',
    async (preferences:[], { getState }) => {
      try {
        const auth = (getState() as any).auth;
        const token = auth.token;
  
        const response = await axios.post('/api/preference/save', preferences, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        return response.data;
      } catch (error) {
        throw new Error('Failed to save preferences');
      }
    }
  );

 const preferenceSlice = createSlice({
  name: 'preferences',
  initialState: {
    myPreferences: {},
    preferences: {},
    loading: false,
    error: null,
    status: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPreferences.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPreferences.fulfilled, (state, action) => {
        state.loading = false;
        state.preferences = action.payload;
      })
      .addCase(fetchPreferences.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch preferences';
      })

      .addCase(fetchMyPreferences.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyPreferences.fulfilled, (state, action) => {
        state.loading = false;
        state.myPreferences = action.payload;
      })
      .addCase(fetchMyPreferences.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch preferences';
      })

      .addCase(savePreferences.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(savePreferences.fulfilled, (state) => {
        state.loading = false;
        state.status = true;
      })
      .addCase(savePreferences.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch preferences';
      })
      ;
  },
});

export default preferenceSlice.reducer;
export const selectPreferences = (state: any) => state.preferences;
