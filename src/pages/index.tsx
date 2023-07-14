import { Layout } from "@/components/layout";
import { Content } from "@/components/content";
import { Sidebar } from "@/components/sidebar";
import { Navbar } from "@/components/navbar";
import Head from "next/head";

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Micro UI</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Layout>
        {/* <Sidebar /> */}
        <Content />
      </Layout>
    </>
  );
}
