import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  return (
    <main style={{ maxWidth: 720, margin: "40px auto", padding: 16 }}>
      <h1>Panel użytkownika</h1>
      <p>Jesteś zalogowany. Tu później dodamy: historię czatów, limity, subskrypcję.</p>
    </main>
  );
}
