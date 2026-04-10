"use client"
import { useUserStore } from "@/lib/store"
import { PostCard } from "@/components/PostCard";
import { useEffect, useState } from "react"
import { useParams } from "next/navigation";
import { LoadingState } from "@/components/LoadingState";
import { ErrorState } from "@/components/ErrorState";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { CreatePostDialog } from "@/components/CreatePostDialog";

const POSTS_PER_PAGE = 5;

export default function PostsPage() {
    const params = useParams()
    const userId = Number(params.id)
    const { posts, isLoading, hasError, fetchPost } = useUserStore();

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchPost(userId);
    }, [userId, fetchPost]);

    const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
    const paginatedPosts = posts.slice(
        (currentPage - 1) * POSTS_PER_PAGE,
        currentPage * POSTS_PER_PAGE
    );

    if (isLoading) return <LoadingState />;
    if (hasError) return <ErrorState />;

    return (
        <div className="max-w-4xl mx-auto py-12 px-6">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">User Posts</h1>
                    <p className="text-gray-500 mt-1">Viewing posts for user #{userId}</p>
                </div>

                <CreatePostDialog />
            </div>

            {posts.length === 0 ? (
                <div className="text-center py-12 text-gray-500">No posts available.</div>
            ) : (
                <>
                    <div className="space-y-6">
                        {paginatedPosts.map((post) => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="mt-10">
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setCurrentPage((p) => Math.max(1, p - 1));
                                            }}
                                            className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                                        />
                                    </PaginationItem>

                                    <PaginationItem>
                                        <PaginationNext
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setCurrentPage((p) => Math.min(totalPages, p + 1));
                                            }}
                                            className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}