import React from "react";

import Head from "next/head";

import { UserContext } from "../../contexts/userContext";

import NavDrawer from "./NavDrawer";

// @ts-ignore
const Layout = ({ children }) => {
  const { user, removeUser } = React.useContext(UserContext);
  return (
    <>
      <Head>
        <title>Logo</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
      </Head>
      {user && <NavDrawer />}
      {children}
    </>
  );
};

export default Layout;