import { useEffect, useState } from "react";
import type { FunctionComponent, Post } from "../common/types";
import { Link, useParams } from "@tanstack/react-router";
import api from "../api/axios.ts";

const getPostById = async (id: number): Promise<Post> => {
	const post = await api.get<{ message: string; data: Post }>(`/posts/${id}`);
	return post.data.data;
};

const updatePost = async (id: number, data: Post | null) => {
	const response = await api.patch(`/posts/${id}`, data);
	console.log(`UPDATED POST (${id}):`, response);
};

export const SinglePost = (): FunctionComponent => {
	const { postId } = useParams({ from: "/posts/$postId" });
	const [post, setForm] = useState<Post | null>(null);
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		const fetchPost = async (): Promise<void> => {
			const foundPost = await getPostById(Number(postId));
			setForm(foundPost || null);
		};
		void fetchPost();
	}, [postId]);

	const handleSubmit = async (event_: React.FormEvent) => {
		event_.preventDefault();
		await updatePost(Number(postId), post);
		setSuccess(true);

		// Optional: Hide success message after a few seconds
		setTimeout(() => setSuccess(false), 3000);
	};

	if (post === null) {
		return (
			<div className="bg-blue-300 w-screen h-screen p-6">
				<Link className="inline-block mb-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition" to="/posts">
					Go Back
				</Link>
				<p>No post with that id...</p>
			</div>
		);
	}

	return (
		<div className="bg-blue-300 w-screen h-screen p-6">
			<Link className="inline-block mb-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition" to="/posts">
				Go Back
			</Link>
			<div className="mb-5 p-6 border rounded bg-white shadow">
				<h1 className="text-3xl font-bold mb-4">{post.title}</h1>
				<p>{post.content}</p>
			</div>
			<form className="bg-white p-6 rounded shadow space-y-4" onSubmit={handleSubmit}>
				<h1 className="text-4xl font-bold text-black-800 mb-4">Edit Post</h1>

				{success && (
					<div className="text-green-600 font-semibold">
						Post updated successfully!
					</div>
				)}

				<input
					className="block w-full p-2 border rounded"
					placeholder="Title"
					value={post.title}
					onChange={(event_) => { setForm({ ...post, title: event_.target.value }); }}
				/>
				<textarea
					className="block w-full p-2 border rounded"
					placeholder="Content"
					value={post.content}
					onChange={(event_) => { setForm({ ...post, content: event_.target.value }); }}
				/>
				<button
					className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
					type="submit"
				>
					Update
				</button>
			</form>
		</div>
	);
};
