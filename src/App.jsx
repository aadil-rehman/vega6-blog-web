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

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />}>
						<Route path="/login" element={<Login />}></Route>
						<Route path="/" element={<FeedBlogs />}></Route>
						<Route path="/myblogs" element={<MyBlogs />}></Route>
						<Route path="/profile" element={<Profile />}></Route>
						<Route path="/blog/view/:blogId" element={<Blog />}></Route>
						<Route path="/blog/edit/:blogId" element={<EditBlog />}></Route>
					</Route>
				</Routes>
			</BrowserRouter>
		</Provider>
	);
}

export default App;
