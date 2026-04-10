import { create } from "zustand"

export interface User {
    id: number;
    name: string;
    email: string;
    companyName: string;
}
export interface Post {
    id: number;
    title: string;
    body: string;
}

type StateStore = {
    users: User[]
    posts: Post[]
    isLoading: boolean;
    hasError: boolean;
    fetchUser: () => Promise<void>;
    fetchPost: (userId: number) => Promise<void>;
    addPost: (post: Post) => void;
}

export const useUserStore = create<StateStore>((set) => ({
    users: [],
    posts: [],
    isLoading: false,
    hasError: false,
    fetchUser: async () => {
        set({ isLoading: true, hasError: false })
        try {
            const baseUrl = process.env.NEXT_PUBLIC_API_URL;
            const response = await fetch(`${baseUrl}/users`);
            const data = await response.json();
            set({ users: data });
        } catch (error) {
            set({ hasError: true })
        } finally {
            set({ isLoading: false })
        }
    },
    fetchPost: async (userId: number) => {
        set({ isLoading: true, hasError: false })
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
            const data = await response.json();
            set({ posts: data });
        } catch (error) {
            set({ hasError: true })
        } finally {
            set({ isLoading: false })
        }
    },
    addPost: (post: Post) => {
        set((state) => ({ posts: [...state.posts, post] }));
    }

}))