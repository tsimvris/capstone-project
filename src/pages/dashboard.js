import Head from 'next/head';

import Layout from '../components/Layout';

export default function HomePage() {
	return (
		<Layout>
			<Head>
				<title key="title">Dashy</title>
				<meta key="description" name="description" content="This is my Capstone project" />
				<link rel="icon" href="/Dashy.webp" />
			</Head>
			<h1>Home</h1>

		</Layout>
	);
}
