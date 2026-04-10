"use client"
import { Search } from "lucide-react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import UserCard from "@/components/ui/UserCard";
import { useUserStore } from "@/lib/store";
import { useState, useEffect } from "react";


export default function UsersPage() {

  const { users, isLoading, hasError, fetchUser } = useUserStore();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <div className={`min-h-screen w-full bg-[#FAFAFC] flex flex-col items-center py-16 px-6`}>
      <div className="max-w-7xl w-full">
        <div className="mb-10 space-y-2">
          <h1 className="text-[48px] font-bold">User Directory</h1>
          <p className="text-gray-500 text-[20px]">Browse Users and View Posts</p>
        </div>
        <InputGroup className="mb-2 max-w-l py-6 px-2 bg-white">
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupInput placeholder="Search users..." />
        </InputGroup>
        <p className="text-gray-500 text-[16px]">Found 10 users</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[32px] gap-y-[40px]">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
}
