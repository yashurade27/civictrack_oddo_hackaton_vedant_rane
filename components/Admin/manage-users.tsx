"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, UserCheck, UserX } from "lucide-react";

type AdminUser = {
  isBanned: any;
  role: string;
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  createdAt: number | Date;
};

type ManageUsersProps = {
  users: AdminUser[];
};

export function ManageUsers({ users: initialUsers }: ManageUsersProps) {
  const [users, setUsers] = React.useState<AdminUser[]>(initialUsers);

  const toggleUserBan = (userId: string) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, isBanned: !user.isBanned } : user
      )
    );
  };

  const toggleUserRole = (userId: string) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId
          ? { ...user, role: user.role === "admin" ? "user" : "admin" }
          : user
      )
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Users</CardTitle>
        <CardDescription>
          View and manage user accounts, roles, and permissions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">
                  {user.firstName} {user.lastName}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <TableCell>
                    <Badge
                      className={
                        user.role === "admin"
                          ? "bg-gray-900 text-white"
                          : "bg-gray-200 text-gray-800"
                      }
                    >
                      {user.role}
                    </Badge>
                  </TableCell>
                </TableCell>

                <TableCell>
                  <Badge variant="outline">Active</Badge>
                </TableCell>
                <TableCell>
                  {new Date(user.createdAt).toLocaleDateString("en-IN")}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => toggleUserRole(user.id)}>
                        Remove Admin
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => toggleUserBan(user.id)}
                        className={"text-red-600"}
                      >
                        <UserX className="mr-2 h-4 w-4" />
                        Ban User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
