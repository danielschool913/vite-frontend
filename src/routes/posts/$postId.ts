import { createFileRoute } from '@tanstack/react-router'
import { Post } from "../../pages/Post";

export const Route = createFileRoute('/posts/$postId')({
    component: Post,
});
