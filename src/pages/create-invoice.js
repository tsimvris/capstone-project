import dynamic from 'next/dynamic';
import Head from 'next/head';

import GenerateInvoiceForm from '../components/Forms/GenerateInvoiceForm';
import Layout from '../components/Layout';
export default function CreateInvoice() {
	const DynamicWrapper = dynamic(
		() => import('../components/Forms/StyledComponents/styledFormWrapper'),
		{
			ssr: false,
		}
	);
	return (
		<Layout>
			<Head>
				<title key="title">Dashy Invoice</title>
				<meta key="description" name="description" content="This is my Capstone project" />
				<link rel="icon" href="/Dashy.webp" />
			</Head>
			<DynamicWrapper>
				<GenerateInvoiceForm />
			</DynamicWrapper>
		</Layout>
	);
}
