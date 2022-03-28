import "../styles/globals.css";
import React from "react";
import { UserProvider } from "@auth0/nextjs-auth0";
import type { AppProps } from "next/app";
import Nav from "../src/components/main/Nav";

export default function App({ Component, pageProps }: AppProps) {
  const headerRef = React.useRef<HTMLElement>(null);
  const headerHeight = headerRef?.current?.getBoundingClientRect().height ?? 0;

  return (
    <UserProvider>
      <header
        ref={headerRef}
        className="z-50 fixed top-0 w-full bg-transparent"
      >
        <Nav />
      </header>
      <main className="z-0 h-screen sm:mx-2">
        <Component {...pageProps} />
      </main>
    </UserProvider>
  );
}
