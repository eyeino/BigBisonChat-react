import '../styles/globals.css'
import React from 'react';
import { UserProvider } from '@auth0/nextjs-auth0';
import type { AppProps } from 'next/app'
import Nav from '../src/components/main/Nav';

export default function App({ Component, pageProps }: AppProps)  {
  return (
    <UserProvider>
      <Nav />
      <Component {...pageProps} />
    </UserProvider>
  );
}