import dynamic from 'next/dynamic';
import Head from 'next/head';
import {useRouter} from 'next/router';

import StyledSpan from '../../components/ClientUI/styledSpan';
import StyledDeleteButton from '../../components/Forms/StyledComponents/styledDeleteButton';
import StyledEditButton from '../../components/Forms/StyledComponents/styledEditButton';
import Layout from '../../components/Layout';
import StyledLi from '../../components/serviceUI/styledLi';
import StyledP from '../../components/serviceUI/styledP';
import StyledUl from '../../components/serviceUI/styledUL';
import StyledButton from '../../components/styledButton';
import StyledWrapper from '../../components/styledClientWrapper';
import useServiceStore from '../../hooks/useServiceStore';
import useUserStore from '../../hooks/useUserStore';

export default function Services() {
	const router = useRouter();
	const logedInUser = useUserStore(state => state.logedInUser);

	const services = useServiceStore(state => state.services);
	const deleteService = useServiceStore(state => state.deleteService);

	const DynamicWrapper = dynamic(() => import('../../components/styledClientWrapper'), {
		ssr: false,
	});

	return (
		<Layout>
			<Head>
				<title key="title">Dashy Services</title>
				<meta key="description" name="description" content="This is my Capstone project" />
				<link rel="icon" href="/Dashy.webp" />
			</Head>
			{logedInUser ? (
				<DynamicWrapper>
					<StyledButton
						onClick={() => {
							router.push({
								pathname: '/services/create-new-service',
							});
						}}
					>
						Add new Service
					</StyledButton>
					<StyledWrapper>
						<StyledUl>
							{services.map(service => {
								return (
									<StyledLi key={service.id}>
										<StyledP>
											<StyledSpan>Service Name :</StyledSpan>
											{service.serviceName}
										</StyledP>
										<StyledP>
											<StyledSpan>Service Description : </StyledSpan>
											{service.serviceDescription}
										</StyledP>
										<StyledP>
											<StyledSpan>Service Price / Hour : </StyledSpan>
											{service.servicePricePerHour}
										</StyledP>
										<StyledP>
											<StyledSpan>Service Tax Key :</StyledSpan>
											{service.serviceTaxKey}%
										</StyledP>
										<StyledEditButton
											onClick={() => {
												router.push({
													pathname: `/services/${service.id}`,
													query: {keyword: 'serviceId'},
												});
											}}
										>
											Edit
										</StyledEditButton>
										<StyledDeleteButton
											type="button"
											onClick={() => {
												deleteService(service.id);
											}}
										>
											Delete
										</StyledDeleteButton>
									</StyledLi>
								);
							})}
						</StyledUl>
					</StyledWrapper>
				</DynamicWrapper>
			) : (
				<DynamicWrapper> You are not logged in </DynamicWrapper>
			)}
		</Layout>
	);
}
