import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import FeedBlogs from "./components/FeedBlogs";
import MyBlogs from "./components/MyBlogs";
import Blog from "./components/Blog";
import Profile from "./components/Profile";
import Login from "./components/Login";
import { Provider } from "react-redux";
import store from "./utils/store";
import EditBlog from "./components/EditBlog";
import CreateBlog from "./components/CreateBlog";
import SignUp from "./components/SignUp";
import LandingPage from "./components/LandingPage";
import EditProfile from "./components/EditProfile";
import UpdatePassword from "./components/UpdatePassword";
import DeleteUserAccount from "./components/DeleteUserAccount";

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route path="/app" element={<LandingPage />}></Route>
					<Route path="/" element={<Home />}>
						<Route path="/feed" element={<FeedBlogs />}></Route>
						<Route path="/blog/create" element={<CreateBlog />}></Route>
						<Route path="/myblogs" element={<MyBlogs />}></Route>
						<Route path="/profile" element={<Profile />}>
							<Route
								path="/profile/editProfile"
								element={<EditProfile />}
							></Route>
							<Route
								path="/profile/editPassword"
								element={<UpdatePassword />}
							></Route>
							<Route
								path="/profile/deleteAccount"
								element={<DeleteUserAccount />}
							></Route>
						</Route>
						<Route path="/blog/view/:blogId" element={<Blog />}></Route>
						<Route path="/blog/edit/:blogId" element={<EditBlog />}></Route>
					</Route>
					<Route path="/login" element={<Login />}></Route>
					<Route path="/signup" element={<SignUp />}></Route>
				</Routes>
			</BrowserRouter>
		</Provider>
	);
}

export default App;
