// export default function Exec() {
//   return (
//     <>
//       <h1>Hello, EXEC Page!</h1>
//     </>
//   );
// }

// import { auth } from "@/_auth";
// import { redirect } from "next/navigation";

export default async function Page() {
  //   const session = await auth();
  //   if (!session) return <div>Not authenticated</div>;
  //   if (session.user.role !== client) return;

  //   if (session.user.role !== "client") {
  //     redirect("/");
  //   }

  return (
    <div>
      {/* <pre>{JSON.stringify(session, null, 2)}</pre> */}
      <p>Exec Page</p>
    </div>
  );
}
