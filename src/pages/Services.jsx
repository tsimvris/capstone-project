import {useRouter} from 'next/router';

import StyledButton from '../components/styledButton';

export default function Services() {
	const router = useRouter();

	return (
		<div>
			<StyledButton
				onClick={() => {
					router.push({
						pathname: '/CreateNewService',
					});
				}}
			>
				Add new Service
			</StyledButton>
		</div>
	);
}
