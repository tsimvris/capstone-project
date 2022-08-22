import dynamic from 'next/dynamic';
import Head from 'next/head';
import {useRouter} from 'next/router';

import Layout from '../components/Layout';
import StyledButton from '../components/styledButton';
export default function Invoice() {
	const DynamicWrapper = dynamic(() => import('../components/styledClientWrapper'), {
		ssr: false,
	});
	const router = useRouter();
	return (
		<Layout>
			<Head>
				<title key="title">Dashy Invoice</title>
				<meta key="description" name="description" content="This is my Capstone project" />
				<link rel="icon" href="/Dashy.webp" />
			</Head>
			<DynamicWrapper>
				<StyledButton
					onClick={() => {
						router.push({
							pathname: '/create-invoice',
						});
					}}
				>
					Generate new Inoice
				</StyledButton>
			</DynamicWrapper>
		</Layout>
	);
}
