import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "@/components/Navbar";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [toggleReload, setToggleReload] = useState(false);
  return (
    <>
      <Navbar setToggleReload={setToggleReload} />
      <Component
        setToggleReload={setToggleReload}
        toggleReload={toggleReload}
        {...pageProps}
      />
    </>
  );
}
