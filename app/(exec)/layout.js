export default function ExecLayout({ children }) {
  return (
    <>
      <p>Exec</p>
      <main>{children}</main>
    </>
  );
}

// // import dbConnect from "@/config/db";
// import { SessionProvider } from "next-auth/react";
// // import SessionProvider from "@/providers/SessionProvider";

// export default function ExecLayout({ children }) {
//   //   const mongodb_connection = await dbConnect();
//   //   const session = await auth();
//   //   console.log("exec", session);

//   return (
//     <>
//       <p>Exec</p>
//       <main>
//         <SessionProvider>{children}</SessionProvider>
//       </main>
//     </>
//   );
// }
