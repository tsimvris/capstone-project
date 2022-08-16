import {useRouter} from 'next/router';

import StyledButton from '../components/styledButton';
import StyledWrapper from '../components/styledClientWrapper';

export default function Services() {
	const router = useRouter();

	return (
		<StyledWrapper>
			<StyledButton
				onClick={() => {
					router.push({
						pathname: '/CreateNewClient',
					});
				}}
			>
				Add new Service
			</StyledButton>
		</StyledWrapper>
	);
}
