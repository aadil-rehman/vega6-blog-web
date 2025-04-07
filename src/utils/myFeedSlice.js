import { createSlice } from "@reduxjs/toolkit";

const myFeedSlice = createSlice({
	name: "myfeed",
	initialState: null,
	reducers: {
		addMyFeed: (state, action) => action.payload,
	},
});

export const { addMyFeed } = myFeedSlice.actions;
export default myFeedSlice.reducer;
