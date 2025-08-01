import { auth, clerkClient } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function AdminPage() {
  const { sessionClaims, userId } = await auth()
  // THIS IS THE DEMO CODE FOR ADMIN PAGE WHERE ONLY THE ADMIN CAN ACCESS AND SEE THE ADMIN USERS
  // IDEALLY HERE THE ADMIN CAN MANAGE USERS, ROLES, AND PERMISSIONS

  // Only allow admins
  if (!userId || sessionClaims?.metadata?.role !== 'admin') {
    redirect('/')
  }

  // Fetch all users from Clerk
  const client = await clerkClient()
  const allUsersResponse = await client.users.getUserList()
  const adminUsers = allUsersResponse.data.filter(
    (user) => user.publicMetadata?.role === 'admin'
  )

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <ul>
        {adminUsers.map((user) => (
          <li key={user.id}>
            {user.emailAddresses[0]?.emailAddress} — {String(user.publicMetadata.role)}
          </li>
        ))}
      </ul>
    </div>
  )
}
