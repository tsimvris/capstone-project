import {useRouter} from 'next/router';

import StyledButton from '../components/styledButton';
export default function Homepage() {
	const router = useRouter();

	return (
		<div>
			<StyledButton
				onClick={() => {
					router.push({
						pathname: '/clients',
					});
				}}
			>
				Clients
			</StyledButton>
			<StyledButton
				onClick={() => {
					router.push({
						pathname: '/services',
					});
				}}
			>
				Services
			</StyledButton>
		</div>
	);
}
