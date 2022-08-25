import Head from 'next/head';

import Layout from '../components/Layout';
import StyledLoginSpan from '../components/login/StyledLoginSpan';
import useUserStore from '../hooks/useUserStore';
export default function HomePage() {
	const logedInUser = useUserStore(state => state.logedInUser);

	return (
		<Layout>
			<Head>
				<title key="title">Dashy</title>
				<meta key="description" name="description" content="This is my Capstone project" />
				<link rel="icon" href="/Dashy.webp" />
			</Head>
			<h1>
				Welcome back, <StyledLoginSpan> {logedInUser?.username}</StyledLoginSpan>
			</h1>
		</Layout>
	);
}
