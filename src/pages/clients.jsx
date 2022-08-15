import {useRouter} from 'next/router';

import StyledButton from '../components/styledButton';

export default function ClientsPage() {
	const router = useRouter();
	return (
		<>
			<StyledButton
				onClick={() => {
					router.push({
						pathname: '/CreateNewClient',
					});
				}}
			>
				Add new Client
			</StyledButton>
		</>
	);
}
