"use client"
import { useUserStore } from "@/lib/store"
import PostCard from "@/components/postCard"
import { useEffect } from "react"
import { useParams } from "next/navigation";
import { LoadingState } from "@/components/loadingState";
import { ErrorState } from "@/components/errorState";

const POSTS_PER_PAGE = 5;

export default function PostsPage() {
    const params = useParams()
    const userId = Number(params.id)
    const { posts, isLoading, hasError, fetchPost } = useUserStore();

    useEffect(() => {
        fetchPost(userId);
    }, [userId, fetchPost]);

    return (
        <div>
            <h1>Posts</h1>
            {isLoading && <LoadingState />}
            {hasError && <ErrorState />}
            {posts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    )
}