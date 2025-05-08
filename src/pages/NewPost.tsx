import { useState } from "react";
import type { FunctionComponent } from "../common/types";
import { Link, useNavigate } from "@tanstack/react-router";
import api from "../api/axios.ts";


export interface PostCreate {
    title: string;
    content: string;
    user_id: number;
}

const createPost = async (data: PostCreate) => {
    try {
        const response = await api.post("/posts", data);
        console.log("POST CREATED:", response.data);
        return true;
    } catch (error) {
        console.error("Failed to create post:", error);
        alert("Failed to create post.");
        return false;
    }
};

export const NewPost = (): FunctionComponent => {
    const [form, setForm] = useState<PostCreate>({ title: "", content: "", user_id: 1});
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await createPost(form);
        if (success) {
            navigate({ to: "/posts" });
        }
    };

    return (
        <div className="bg-blue-300 w-screen h-screen p-6">
            <Link
                className="inline-block mb-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition"
                to="/posts"
            >
                Go Back
            </Link>
            <h1 className="text-4xl font-bold text-black-800 mb-4">Create a New Post</h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
                <input
                    className="block w-full p-2 border rounded"
                    placeholder="Title"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
                <textarea
                    className="block w-full p-2 border rounded"
                    placeholder="Content"
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};
