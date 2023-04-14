import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import client from "../../apollo-client";
import Navbar from "@/components/Navbar/Navbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="body">
      <ApolloProvider client={client}>
        <Navbar />
        <Component {...pageProps} />
      </ApolloProvider>
    </div>
  );
}
