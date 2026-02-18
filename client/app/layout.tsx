import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { ModalProvider } from "@/providers/modal-provider";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin panel",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="{inter.className}">

        <ClerkProvider>
           {children}
           <ModalProvider/>
          
        </ClerkProvider>
      </body>
    </html>
  );
}
