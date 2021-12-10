import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  allReviews: [],
};

const reviewsSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    getAllReviews: (state, action) => {
      state.allReviews = action.payload.reviewsData;
    },
  },
});
export const { getAllReviews } = reviewsSlice.actions;
export const selectReviews = (state) => state.review.allReviews;
export default reviewsSlice.reducer;
