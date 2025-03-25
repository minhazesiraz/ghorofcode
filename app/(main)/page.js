"use client";

import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  if (!session) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>Hello, Home Page!</h1>
      <h1>Welcome {session.user.name}</h1>
      <img src={session.user.image} alt="User Image" />
    </>
  );
}
