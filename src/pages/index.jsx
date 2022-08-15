import {useRouter} from 'next/router';

import StyledLi from '../components/ClientUI/styledLi';
import StyledUl from '../components/ClientUI/styledUL';
import StyledButton from '../components/styledButton';
import StyledWrapper from '../components/styledClientWrapper';
import useClientStore from '../hooks/useClientStore';

export default function ClientsPage() {
	const clients = useClientStore(state => state.clients);
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
				Add new Client
			</StyledButton>
			<StyledWrapper>
				<StyledUl>
					{clients
						?.sort((a, b) => a.CompanyName.localeCompare(b.CompanyName))
						.map(client => {
							return <StyledLi key={client.id}>{client.CompanyName}</StyledLi>;
						})}
				</StyledUl>
			</StyledWrapper>
		</StyledWrapper>
	);
}
