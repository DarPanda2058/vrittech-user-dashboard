import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertCircle } from "lucide-react";

export function ErrorState() {
    return (
        <Alert className=" w-80 mx-auto my-12 flex flex-col items-center justify-center py-12">
            <AlertCircle className="mx-auto mb-3" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription className="text-center">Something went wrong. Please try again later.</AlertDescription>
        </Alert>
    )
}
