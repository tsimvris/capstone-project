import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';

import StyledSpan from '../components/ClientUI/styledSpan';
import StyledEditButton from '../components/Forms/StyledComponents/styledEditButton';
import StyledLi from '../components/serviceUI/styledLi';
import StyledP from '../components/serviceUI/styledP';
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
										<StyledSpan>Service Price : </StyledSpan>
										{service.servicePricePerHour}
									</StyledP>
									<StyledP>
										<StyledSpan>Service Tax Key :</StyledSpan>
										{service.serviceTaxKey}
									</StyledP>
									<StyledEditButton>Edit</StyledEditButton>
								</StyledLi>
						);
					})}
				</StyledUl>
			</StyledWrapper>
		</DynamicWrapper>
	);
}
