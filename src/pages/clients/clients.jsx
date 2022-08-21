import dynamic from 'next/dynamic';
import Head from 'next/head';
import {useRouter} from 'next/router';
import {useState} from 'react';
import {useRef} from 'react';

import StyledLi from '../../components/ClientUI/styledLi';
import StyledSearchField from '../../components/ClientUI/styledSearchField';
import StyledSpan from '../../components/ClientUI/styledSpan';
import StyledUl from '../../components/ClientUI/styledUL';
import StyledEditButton from '../../components/Forms/StyledComponents/styledEditButton';
import StyledSubmitButton from '../../components/Forms/StyledComponents/StyledSubmitButton';
import Layout from '../../components/Layout';
import StyledButton from '../../components/styledButton';
import StyledWrapper from '../../components/styledClientWrapper';
import useClientStore from '../../hooks/useClientStore';

export default function ClientsPage() {
	const clients = useClientStore(state => state.clients);
	const router = useRouter();
	const inputRef = useRef(null);
	const DynamicWrapper = dynamic(() => import('../../components/styledClientWrapper'), {
		ssr: false,
	});

	// search function
	const [filteredClients, setFilteredClients] = useState(clients);
	const clientSearch = inputRef => {
		const filtered = clients.filter(client => {
			return client.CompanyName === inputRef.current.value;
		});
		setFilteredClients(filtered);
	};
	function handleClick() {
		console.log(inputRef.current.value);
		console.log(filteredClients);
	}
	return (
		<Layout>
			<Head>
				<title key="title">Dashy</title>
				<meta key="description" name="description" content="This is my Capstone project" />
				<link rel="icon" href="/Dashy.webp" />
			</Head>
			<DynamicWrapper>
				<form
					className="form"
					onSubmit={event => {
						event.preventDefault();
						clientSearch(inputRef);
					}}
				>
					<StyledSearchField
						type="search"
						ref={inputRef}
						placeholder="Search for a Client"
					/>
					<StyledSubmitButton onClick={handleClick} name="submitButton" type="submit">
						Search
					</StyledSubmitButton>
				</form>

				<StyledUl>
					{filteredClients ? (
						<>
							{filteredClients.map(client => {
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
						</>
					) : (
						''
					)}
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
