'use client';

import * as React from 'react';
import { AdminSidebar } from '@/components/Admin/admin-sidebar';
import { ManageUsers } from '@/components/Admin/manage-users';
import { UpdateStatus } from '@/components/Admin/update-status';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';

type AdminUser = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  createdAt: number | Date;
  isBanned: boolean;
  role: string; // 'admin' or 'user'
};

type AdminDashboardProps = {
  users: AdminUser[];
};

export default function AdminDashboard({ users }: AdminDashboardProps) {
  const [activeView, setActiveView] = React.useState<'users' | 'status'>('users');

  const renderContent = () => {
    switch (activeView) {
      case 'users':
        return <ManageUsers users={users} />;
      case 'status':
        return <UpdateStatus />;
      default:
        return null;
    }
  };

  const getBreadcrumbTitle = () =>
    activeView === 'users' ? 'Manage Users' : 'Update Status';

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/admin">Admin Panel</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>{getBreadcrumbTitle()}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="flex gap-4 mb-4">
            <button
              onClick={() => setActiveView('users')}
              className={`px-4 py-2 rounded-md transition-colors ${
                activeView === 'users'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              Manage Users
            </button>
            <button
              onClick={() => setActiveView('status')}
              className={`px-4 py-2 rounded-md transition-colors ${
                activeView === 'status'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              Update Status
            </button>
          </div>
          {renderContent()}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
