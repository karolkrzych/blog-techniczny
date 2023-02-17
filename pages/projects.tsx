import type { NextPage } from 'next';
import Layout from 'components/Layout';
import Head from 'next/head';

const Projects: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title> Projects </title>
      </Head>
      <p>All my projects</p>
    </Layout>
  );
};

export default Projects;
