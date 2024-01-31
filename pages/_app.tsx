import React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import "../styles/styles.css";
import {WalletProvider} from "../components/WalletProvider";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>CosmosKit-Issue</title>
      </Head>
      <>
          <WalletProvider>
            <Component {...pageProps} />
          </WalletProvider>
      </>
    </>
  );
};

export default MyApp;
