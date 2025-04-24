import { createFileRoute } from '@tanstack/react-router'
import { SinglePost } from "../../pages/SinglePost.tsx";

export const Route = createFileRoute('/posts/$postId')({
    component: SinglePost,
});
