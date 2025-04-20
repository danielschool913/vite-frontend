import { useState } from "react";
import type { FunctionComponent } from "../common/types";
import {Link} from "@tanstack/react-router";

interface PostData {
    title: string;
    content: string;
}

const createPost = (data: PostData) => {
    console.log("NEW POST DATA RECEIVED:", data);
};

export const NewPost = (): FunctionComponent => {
    const [form, setForm] = useState<PostData>({ title: "", content: "" });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createPost(form);
    };

    return (
        <div className="bg-blue-300 w-screen h-screen p-6">
            <Link className="inline-block mb-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition" to="/posts">Go Back</Link>
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
