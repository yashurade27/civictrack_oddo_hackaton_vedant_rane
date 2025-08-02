import { auth, clerkClient } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import AdminDashboard from './dashboard';

export default async function AdminPage() {
  const { sessionClaims, userId } = await auth();

  // ✅ Only allow admins
  if (!userId || sessionClaims?.metadata?.role !== 'admin') {
    redirect('/');
  }

  // ✅ Fetch all users
  const client = await clerkClient();
  const allUsersResponse = await client.users.getUserList();

  // ✅ Map and sanitize user data
  const allUsers = allUsersResponse.data.map((user) => ({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.emailAddresses[0]?.emailAddress ?? '',
    createdAt: user.createdAt,
    isBanned:
      typeof user.publicMetadata?.isBanned === 'boolean'
        ? user.publicMetadata.isBanned
        : false,
    role: user.publicMetadata?.role === 'admin' ? 'admin' : 'user', // ✅ correct dynamic role
  }));

  return <AdminDashboard users={allUsers} />;
}
