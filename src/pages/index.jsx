import {useRouter} from 'next/router';

import StyledLi from '../components/ClientUI/styledLi';
import StyledSpan from '../components/ClientUI/styledSpan';
import StyledUl from '../components/ClientUI/styledUL';
import StyledEditButton from '../components/Forms/StyledComponents/styledEditButton';
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
							return (
								<StyledLi key={client.id}>
									<StyledSpan>{client.CompanyName}</StyledSpan>
									<StyledEditButton
										onClick={() => {
											router.push({
												pathname: `/${client.CompanyTaxID}`,
												query: {keyword: 'clientTaxID'},
											});
										}}
									>
										Edit
									</StyledEditButton>
								</StyledLi>
							);
						})}
				</StyledUl>
			</StyledWrapper>
		</StyledWrapper>
	);
}
