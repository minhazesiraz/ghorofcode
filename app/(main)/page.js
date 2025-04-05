"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const { data: session } = useSession();

  //   if (!session) {
  //     return <p>Loading...</p>;
  //   }

  return (
    <>
      <h1>Hello, Home Page!</h1>
      <h1>Welcome {session?.user.name}</h1>
      {/* <Image
        //   src={session?.user.image}
        src={session?.user.image || null}
        width={50}
        height={50}
        alt="User Image"
        priority={false}
      /> */}
      {session?.user.image && (
        <Image
          src={session.user.image}
          width={250}
          height={250}
          alt="User Image"
          priority={false}
        />
      )}

      <p>Your role: {session?.user?.role || "No role assigned"}</p>
      <button onClick={() => signOut({ callbackUrl: "/login" })}>
        Sign Out
      </button>
    </>
  );
}
