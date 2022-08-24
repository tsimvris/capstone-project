import dynamic from 'next/dynamic';
import Head from 'next/head';

import StyledLoginForm from '../components/Forms/StyledLoginForm';
import Layout from '../components/Layout';
import StyledLoginWrapper from '../components/login/styledLoginWrapper';
import useMyStore from '../hooks/useMyStore';
export default function Homepage() {
	const DynamicWrapper = dynamic(
		() => import('../components/Forms/StyledComponents/styledFormWrapper'),
		{
			ssr: false,
		}
	);
	const addLogo = useMyStore(state => state.addLogo);
	const myLogo = useMyStore(state => state.myLogo);

	const defaultLogo = '/defaultLogo.svg';
	if (myLogo.length === 0) {
		addLogo(defaultLogo);
	}
	return (
		<Layout>
			<Head>
				<title key="title">Dashy Login</title>
				<meta key="description" name="description" content="This is my Capstone project" />
				<link rel="icon" href="/Dashy.webp" />
			</Head>
			<DynamicWrapper>
				<StyledLoginWrapper>
					<StyledLoginForm />
				</StyledLoginWrapper>
			</DynamicWrapper>
		</Layout>
	);
}
