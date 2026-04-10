"use client"

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useUserStore } from "@/lib/store";
import { postSchema, PostFormValues } from "@/lib/verification";

export function CreatePostDialog() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { addPost } = useUserStore();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<PostFormValues>({
        resolver: zodResolver(postSchema as any),
        defaultValues: {
            title: "",
            body: "",
        }
    });

    const onSubmit = (data: PostFormValues) => {
        addPost({
            id: Date.now(),
            title: data.title,
            body: data.body,
        });
        reset();
        setIsDialogOpen(false);
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button>Create Post</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Create a new post</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            placeholder="Enter post title"
                            {...register("title")}
                        />
                        {errors.title && (
                            <p className="text-sm text-red-500">{errors.title.message}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="body">Body</Label>
                        <Textarea
                            id="body"
                            placeholder="What's on your mind?"
                            rows={4}
                            {...register("body")}
                        />
                        {errors.body && (
                            <p className="text-sm text-red-500">{errors.body.message}</p>
                        )}
                    </div>
                    <Button type="submit" className="w-full">
                        Post
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
