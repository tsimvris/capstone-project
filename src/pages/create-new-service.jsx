import Head from 'next/head';

import CreateNewServiceForm from '../components/Forms/CreateNewServiceForm';
import Layout from '../components/Layout';
export default function CreateNewService() {
	return (
		<Layout>
			<Head>
				<title key="title">Dashy</title>
				<meta key="description" name="description" content="This is my Capstone project" />
				<link rel="icon" href="/Dashy.webp" />
			</Head>
			<CreateNewServiceForm />
		</Layout>
	);
}
