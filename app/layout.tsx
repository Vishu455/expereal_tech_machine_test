"use client";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/navbar";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  ThemeProviderWrapper,
  useThemeContext,
} from "./components/themeContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ThemeProviderWrapper>
      <html lang="en">
        <BodyContent queryClient={queryClient}>{children}</BodyContent>
      </html>
    </ThemeProviderWrapper>
  );
}

function BodyContent({
  children,
  queryClient,
}: {
  children: React.ReactNode;
  queryClient: QueryClient;
}) {
  const { mode } = useThemeContext();
  return (
    <body
      style={{
        backgroundColor: mode === "dark" ? "#121212" : "#ffffff",
        color: mode === "dark" ? "#ffffff" : "#000000",
        transition: "background-color 0.3s ease-in-out, color 0.3s ease-in-out",
      }}
    >
      <header className="bg-primary">
        <Navbar />
      </header>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css"
      />
    </body>
  );
}
