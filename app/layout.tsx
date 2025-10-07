import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = { title: "lexumi", description: "Asystent prawny" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="pl">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
