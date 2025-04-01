// "use client";

// import { useSession } from "next-auth/react";

// export default function Dashboard() {
//   const { data: session } = useSession();
//   console.log(session);

//   if (!session) return <p>Loading...</p>;

//   return (
//     <div>
//       <h1>Welcome, {session.user.name}</h1>
//       <p>Your role: {session.user.role}</p>

//       {session.user.role === "administrant" && <button>Manage Users</button>}
//       {session.user.role === "moderator" && <button>Review Posts</button>}
//     </div>
//   );
// }

"use client";

import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;

  if (!session) return <p>Please log in to access the dashboard.</p>;

  return (
    <div>
      <h1>Welcome, {session.user.name}</h1>
      <p>Your role: {session.user.role}</p>

      {session.user.role === "administrant" && <button>Manage Users</button>}
      {session.user.role === "moderator" && <button>Review Posts</button>}
    </div>
  );
}
