import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';

import StyledLi from '../components/ClientUI/styledLi';
import StyledSpan from '../components/ClientUI/styledSpan';
import StyledUl from '../components/ClientUI/styledUL';
import StyledEditButton from '../components/Forms/StyledComponents/styledEditButton';
import Layout from '../components/Layout';
import StyledButton from '../components/styledButton';
import StyledWrapper from '../components/styledClientWrapper';
import useClientStore from '../hooks/useClientStore';

export default function ClientsPage() {
	const clients = useClientStore(state => state.clients);
	const router = useRouter();
	const DynamicWrapper = dynamic(() => import('../components/styledClientWrapper'), {
		ssr: false,
	});
	return (
		<Layout>
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
							pathname: '/create-new-client',
						});
					}}
				>
					Add new Client
				</StyledButton>
				<StyledWrapper>
					<StyledUl>
						{clients
							?.sort((a, b) => a.CompanyName?.localeCompare(b.CompanyName))
							.map(client => {
								return (
									<StyledLi key={client.id}>
										<StyledSpan>{client.CompanyName}</StyledSpan>
										<StyledEditButton
											onClick={() => {
												router.push({
													pathname: `/${client.id}`,
													query: {keyword: 'clientId'},
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
			</DynamicWrapper>
		</Layout>
	);
}
