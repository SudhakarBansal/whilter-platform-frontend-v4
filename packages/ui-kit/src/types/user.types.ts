export interface User {
    id: number;
    fullName: string;
    email: string;
    username: string;
    status: "Active" | "Inactive" | "Banned" | "Pending" | "Suspended";
    role: "Admin" | "User" | "Moderator" | "Guest";
    joinedDate: string;
    lastActive: string;
  }
  