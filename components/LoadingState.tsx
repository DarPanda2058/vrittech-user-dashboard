import { Spinner } from "./ui/spinner";

export function LoadingState() {
    return (
        <div className="flex items-center justify-center py-12">
            <div className="mx-auto">
                <Spinner className="w-8 h-8 mx-auto mb-3" />
                <p className="text-gray-600 text-lg">Loading users...</p>
            </div>
        </div>
    )
}
