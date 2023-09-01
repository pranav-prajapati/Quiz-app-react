import { configureStore } from "@reduxjs/toolkit";
import questionsSlice from "./questions.slice";

const store=configureStore({
    reducer:{
        Quiz : questionsSlice
    }
})

export default store;