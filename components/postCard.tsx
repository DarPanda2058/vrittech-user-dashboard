import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Post } from "@/lib/store"

interface postCardProp {
    post: Post
}

export default function PostCard({ post }: postCardProp) {
    return (
        <Card className="mt-4 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader className="pb-2">
                <h3 className="text-lg font-semibold text-gray-900">
                    {post.title}
                </h3>
            </CardHeader>
            <CardContent className="space-y-1 text-sm text-gray-600">
                <p>{post.body}</p>
            </CardContent>
        </Card>
    )
}