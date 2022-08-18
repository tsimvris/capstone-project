import dynamic from 'next/dynamic';
import Head from 'next/head';
import {useRouter} from 'next/router';

import Layout from '../components/Layout';
import StyledLi from '../components/serviceUI/styledLi';
import StyledUl from '../components/serviceUI/styledUL';
import StyledButton from '../components/styledButton';
import StyledWrapper from '../components/styledClientWrapper';
import useServiceStore from '../hooks/useServiceStore';

export default function Services() {
	const router = useRouter();
	const services = useServiceStore(state => state.services);
	const DynamicWrapper = dynamic(() => import('../components/styledClientWrapper'), {
		ssr: false,
	});
	return (
		<Layout>
			<Head>
				<title key="title">Dashy</title>
				<meta key="description" name="description" content="This is my Capstone project" />
				<link rel="icon" href="/Dashy.webp" />
			</Head>
			<DynamicWrapper>
				<StyledButton
					onClick={() => {
						router.push({
							pathname: '/',
						});
					}}
				>
					Home
				</StyledButton>
				<StyledButton
					onClick={() => {
						router.push({
							pathname: '/create-new-service',
						});
					}}
				>
					Add new Service
				</StyledButton>
				<StyledWrapper>
					<StyledUl>
						{services.map(service => {
							return <StyledLi key={service.id}>{service.serviceName}</StyledLi>;
						})}
					</StyledUl>
				</StyledWrapper>
			</DynamicWrapper>
		</Layout>
	);
}
