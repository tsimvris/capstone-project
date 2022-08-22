import {search} from 'fast-fuzzy';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import {useRouter} from 'next/router';
import {useState} from 'react';

import StyledLi from '../../components/ClientUI/styledLi';
import StyledSearchField from '../../components/ClientUI/styledSearchField';
import StyledSpan from '../../components/ClientUI/styledSpan';
import StyledUl from '../../components/ClientUI/styledUL';
import StyledEditButton from '../../components/Forms/StyledComponents/styledEditButton';
import Layout from '../../components/Layout';
import StyledButton from '../../components/styledButton';
import StyledWrapper from '../../components/styledClientWrapper';
import StyledSearchWrapper from '../../components/styledSearchWrapper';
import useClientStore from '../../hooks/useClientStore';

export default function ClientsPage() {
	const clients = useClientStore(state => state.clients);
	const router = useRouter();
	const DynamicWrapper = dynamic(() => import('../../components/styledClientWrapper'), {
		ssr: false,
	});
	const [inputValue, setInputValue] = useState('');

	const fuzzyResult = search(inputValue, clients, {
		keySelector: obj => obj.CompanyName,
		threshold: 0.9,
		ignoreCase: true,
	});

	return (
		<Layout>
			<Head>
				<title key="title">Dashy Clients</title>
				<meta key="description" name="description" content="This is my Capstone project" />
				<link rel="icon" href="/Dashy.webp" />
			</Head>
			<StyledSearchWrapper>
				<StyledSearchField
					value={inputValue}
					type="text"
					placeholder="Search for a Client"
					onChange={event => {
						setInputValue(event.target.value);
					}}
				/>
			</StyledSearchWrapper>
			<DynamicWrapper>
				<StyledUl>
					{fuzzyResult?.map(result => {
						return (
							<StyledLi key={result.id}>
								{result.CompanyName}
								<StyledEditButton
									onClick={() => {
										router.push({
											pathname: `/clients/${result.id}`,
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
				<StyledButton
					onClick={() => {
						router.push({
							pathname: '/clients/create-new-client',
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
													pathname: `/clients/${client.id}`,
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
