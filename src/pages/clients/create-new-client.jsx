import Head from 'next/head';

import CreateNewClientForm from '../../components/Forms/CreateNewClientForm';
import Layout from '../../components/Layout';
export default function CreateNewClient() {
	return (
		<Layout>
			<Head>
				<title key="title">Dashy</title>
				<meta key="description" name="description" content="This is my Capstone project" />
				<link rel="icon" href="/Dashy.webp" />
			</Head>
			<CreateNewClientForm />
		</Layout>
	);
}
