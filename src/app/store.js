import { configureStore } from "@reduxjs/toolkit";
import cardReducer from "../features/cardSlice";
import userReducer from "../features/userSlice";
import reviewReducer from "../features/reviewsSlice";

export const store = configureStore({
  reducer: {
    card: cardReducer,
    user: userReducer,
    review: reviewReducer,
  },
});
