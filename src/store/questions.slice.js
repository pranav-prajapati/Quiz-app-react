import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getQuestions } from "../services/Questions.service";
import { update } from "lodash";

const initialState = {
  email: "",
  questions: [],
  answers: {
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
    8: "",
    9: "",
    10: "",
    11: "",
    12: "",
    13: "",
    14: "",
    15: "",
  },
  isLoading: "idle",
  testEnd:false
};

export const getQuestionsAsync = createAsyncThunk("get/questions", async () => {
  return getQuestions();
});

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setState: (state, payload) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      const { key, value } = payload.payload;
      update(state, `${key}`, () => value);
    },
    reset: () => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(getQuestionsAsync.pending, (state, action) => {
        state.isLoading = "loading";
      })
      .addCase(getQuestionsAsync.fulfilled, (state, action) => {
        state.questions = action.payload;
        state.isLoading = "success";
      })
      .addCase(getQuestionsAsync.rejected, (state, action) => {
        state.isLoading = "failed";
      });
  },
});

export const { setState, reset } = questionsSlice.actions;
export default questionsSlice.reducer;
