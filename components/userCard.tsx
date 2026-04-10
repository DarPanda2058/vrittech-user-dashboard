import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { User } from "@/lib/store"
import Link from "next/link"

interface userCardProp {
    user: User
}

export function UserCard({ user }: userCardProp) {
    return (
        <Card className="mt-4 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader className="pb-2">
                <h3 className="text-lg font-semibold text-gray-900">
                    {user.name}
                </h3>
            </CardHeader>

            <CardContent className="space-y-1 text-sm text-gray-600">
                <p>{user.email}</p>
                <p>{user.company.name}</p>
            </CardContent>

            <CardFooter className="pt-4">
                <Link
                    href={`/users/${user.id}`}
                    className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                >
                    View Posts →
                </Link>
            </CardFooter>
        </Card>
    )
}