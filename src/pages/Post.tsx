import { useEffect, useState } from "react";
import type { FunctionComponent } from "../common/types";
import { Link, useParams } from "@tanstack/react-router";

interface Post {
	id: number;
	title: string;
	content: string;
}

const getPostById = (id: number): Post | undefined => {
	const posts = [
		{ id: 1, title: "Breaking Bad", content: "Walter White begins cooking meth with Jesse Pinkman." },
		{ id: 2, title: "Ozymandias", content: "Everything falls apart in the most iconic episode." },
		{ id: 3, title: "Felina", content: "The story ends where it began, with a final plan." },
	];
	return posts.find((p) => p.id === id);
};

const updatePost = (id: number, data: { title: string; content: string }) => {
	console.log(`UPDATED POST (${id}):`, data);
};

export const Post = (): FunctionComponent => {
	const { postId } = useParams({ from: "/posts/$postId" });
	const [post, setForm] = useState({ title: "", content: "" });

	useEffect(() => {
		const post = getPostById(Number(postId));
		if (post) {
			setForm({ title: post.title, content: post.content });
		}
	}, [postId]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		updatePost(Number(postId), post);
	};

	return (
		<div className="bg-blue-300 w-screen h-screen p-6">
			<Link className="inline-block mb-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition" to="/posts">
				Go Back
			</Link>
			<div className="mb-5 p-6 border rounded bg-white shadow">
				<h1 className="text-3xl font-bold mb-4">{post.title}</h1>
				<p>{post.content}</p>
			</div>
			<form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
				<h1 className="text-4xl font-bold text-black-800 mb-4">Edit Post</h1>
				<input
					className="block w-full p-2 border rounded"
					placeholder="Title"
					value={post.title}
					onChange={(e) => setForm({ ...post, title: e.target.value })}
				/>
				<textarea
					className="block w-full p-2 border rounded"
					placeholder="Content"
					value={post.content}
					onChange={(e) => setForm({ ...post, content: e.target.value })}
				/>
				<button
					type="submit"
					className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
				>
					Update
				</button>
			</form>
		</div>
	);
};
