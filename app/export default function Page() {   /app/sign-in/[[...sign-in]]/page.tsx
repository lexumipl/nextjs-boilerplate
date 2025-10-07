export default function Page() {
  // leniwa dynamiczna importacja, gdyby coś nie chciało się zbudować
  const SignIn = require("@clerk/nextjs").SignIn;
  return (
    <main style={{ maxWidth: 420, margin: "80px auto", padding: 16 }}>
      <SignIn />
    </main>
  );
}
