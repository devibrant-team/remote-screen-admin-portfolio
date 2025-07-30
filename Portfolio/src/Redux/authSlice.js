import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to send registration data to backend (fake API)
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ name, email, password }, thunkAPI) => {
    console.log(name , email , password)
    try {
      const response = await fetch(
       "http://192.168.10.107/remote-screen-backend/public/api/portofolio/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to register");
      }

      const data = await response.json();
      return data; // This will be action.payload in extraReducers
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  user: null,
  password: "",
  confirmPassword: "",
  loading: false,
  error: null,
  registrationResult: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setGoogleUser(state, action) {
      state.user = action.payload;
    },
    setPasswords(state, action) {
      state.password = action.payload.password;
      state.confirmPassword = action.payload.confirmPassword;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.registrationResult = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.registrationResult = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to register";
      });
  },
});

export const { setGoogleUser, setPasswords } = authSlice.actions;
export default authSlice.reducer;
