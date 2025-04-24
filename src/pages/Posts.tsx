import { useEffect, useState } from "react";
import type { FunctionComponent, Post } from "../common/types";
import { Link } from "@tanstack/react-router";
import api from "../api/axios.ts";


// Mock functions
const getAllPosts = async (): Promise<Array<Post>> => {
    const response = await api.get<{message: string; data: Array<Post>}>("/posts");
    console.log(response.data.data);
    return response.data.data;
};

const deletePost = async (id: number): Promise<void> => {
    const response = await api.delete(`/posts/${id}`)
    console.log(`POST DELETED: ${id}`, response);
};

export const Posts = (): FunctionComponent => {
    const [posts, setPosts] = useState<Array<Post>>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const postsData = await getAllPosts();
            setPosts(postsData);
        };

        fetchPosts();
    }, []);


    const handleDelete = (id: number) => {
        const confirmed = confirm("Are you sure you want to delete this post?");
        if (confirmed) {
            deletePost(id); // Call the mock function
            setPosts((prev) => prev.filter((post) => post.id !== id));
        }
    };

    return (
        <div className="bg-blue-300 w-screen h-screen p-6">
            <Link className="inline-block mb-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition" to="/">Go back to homepage</Link>
            <h1 className="text-3xl font-bold mb-4">Posts</h1>
            <ul className="space-y-4">
                {[...posts].reverse().map((post) => (
                    <li key={post.id} className="relative p-4 border rounded bg-white shadow">
                        <Link to={`/posts/${post.id}`}>
                            <h2 className="text-xl font-semibold">{post.title}</h2>
                            <p>{post.content}</p>
                        </Link>
                        <button
                            className="absolute top-2 right-2 px-4 py-1 bg-red-500 text-white text-sm font-medium rounded hover:bg-red-600 transition"
                            onClick={() => handleDelete(post.id)}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
            <Link
                className="inline-block mt-6 px-6 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition"
                to="/posts/new"
            >
                New Post
            </Link>
        </div>
    );
};
