import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import myFeedReducer from "./myFeedSlice";

const store = configureStore({
	reducer: {
		user: userReducer,
		feed: feedReducer,
		myfeed: myFeedReducer,
	},
});

export default store;
