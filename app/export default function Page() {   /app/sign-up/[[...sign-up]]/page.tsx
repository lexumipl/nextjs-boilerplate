export default function Page() {
  const SignUp = require("@clerk/nextjs").SignUp;
  return (
    <main style={{ maxWidth: 420, margin: "80px auto", padding: 16 }}>
      <SignUp />
    </main>
  );
}
