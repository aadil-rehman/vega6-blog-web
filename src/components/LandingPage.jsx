import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const LandingPage = () => {
	return (
		<>
			<Navbar />
			<LandingPageContent />
			<Footer />
		</>
	);
};

function LandingPageContent() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen pt-20 pb-20 bg-base-100 text-base-content">
			<section className="text-center max-w-2xl px-4">
				<h1 className="text-4xl sm:text-5xl font-bold mb-6">
					Welcome to <span className="text-primary">Bloggify</span>
				</h1>
				<p className="text-lg opacity-80 mb-8">
					Share your thoughts, connect with readers, and explore ideas from
					around the world.
				</p>
				<div className="flex justify-center gap-4">
					<Link to="/feed" className="btn btn-primary">
						Explore Blogs
					</Link>
					<Link to="/blog/create" className="btn btn-outline">
						Create Blog
					</Link>
				</div>
			</section>

			<section className="grid md:grid-cols-3 gap-6 mt-16 px-6 max-w-6xl w-full">
				<div className="p-6 bg-base-200 rounded-2xl shadow hover:scale-105 transition-transform duration-300">
					<h2 className="text-xl font-semibold mb-2">Write</h2>
					<p className="opacity-70">
						Express your ideas with ease using our intuitive blog editor.
					</p>
				</div>
				<div className="p-6 bg-base-200 rounded-2xl shadow hover:scale-105 transition-transform duration-300">
					<h2 className="text-xl font-semibold mb-2">Connect</h2>
					<p className="opacity-70">
						Engage with fellow writers and readers in the community.
					</p>
				</div>
				<div className="p-6 bg-base-200 rounded-2xl shadow hover:scale-105 transition-transform duration-300">
					<h2 className="text-xl font-semibold mb-2">Inspire</h2>
					<p className="opacity-70">
						Your words can inspire someone — start publishing today!
					</p>
				</div>
			</section>
		</div>
	);
}

export default LandingPage;
