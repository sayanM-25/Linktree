import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Linktree- your favourite link sharing site",
  description: "This is an easy link sharing platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col font-sans">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
