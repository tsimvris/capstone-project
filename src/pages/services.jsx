import {useRouter} from 'next/router';

import StyledLi from '../components/serviceUI/styledLi';
import StyledUl from '../components/serviceUI/styledUL';
import StyledButton from '../components/styledButton';
import StyledWrapper from '../components/styledClientWrapper';
import useServiceStore from '../hooks/useServiceStore';

export default function Services() {
	const router = useRouter();
	const services = useServiceStore(state => state.services);

	return (
		<StyledWrapper>
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
		</StyledWrapper>
	);
}
