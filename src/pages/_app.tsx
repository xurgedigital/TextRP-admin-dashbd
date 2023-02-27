import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { XummProvider } from "xumm-react";

export default function App({ Component, pageProps }: AppProps) {
  const config = {
    url: "",
    getToken: () => (console.log("")),
    setToken: () => (console.log("")),
    removeToken: () => (console.log("")),
  };
  return (
    <XummProvider config={config}>
      <Component {...pageProps} />
    </XummProvider>
  );
}
