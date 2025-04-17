import { useEffect, useState } from "react";
import type { FunctionComponent } from "../common/types";

interface Post {
	id: number;
	title: string;
	content: string;
}

const getAllPosts = (): Array<Post> => {
	return [
		{ id: 1, title: "Breaking Bad", content: "Walter White begins cooking meth with Jesse Pinkman." },
		{ id: 2, title: "Ozymandias", content: "Everything falls apart in the most iconic episode." },
		{ id: 3, title: "Felina", content: "The story ends where it began, with a final plan." },
	];
};

export const Posts = (): FunctionComponent => {
	const [posts, setPosts] = useState<Array<Post>>([]);

	useEffect(() => {
		const postsData = getAllPosts();
		setPosts(postsData);
	}, []);

	return (
		<div className="bg-blue-300 w-screen h-screen p-6">
			<h1 className="text-3xl font-bold mb-4">Posts</h1>
			<ul className="space-y-4">
				{posts.map((post) => (
					<li key={post.id} className="p-4 border rounded bg-white shadow">
						<h2 className="text-xl font-semibold">{post.title}</h2>
						<p>{post.content}</p>
					</li>
				))}
			</ul>
		</div>
	);
};
