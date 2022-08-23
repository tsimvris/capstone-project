import dynamic from 'next/dynamic';
import Head from 'next/head';
import {useRouter} from 'next/router';

import Layout from '../components/Layout';
import StyledUl from '../components/serviceUI/styledUL';
import StyledButton from '../components/styledButton';
import StyledParagraph from '../components/styledParagraph';
import StyledSpan from '../components/styledSpan';
import useClientStore from '../hooks/useClientStore';
export default function Invoice() {
	const DynamicWrapper = dynamic(() => import('../components/styledClientWrapper'), {
		ssr: false,
	});
	const invoices = useClientStore(state => state.invoices);

	const router = useRouter();
	return (
		<Layout>
			<Head>
				<title key="title">Dashy Invoice</title>
				<meta key="description" name="description" content="This is my Capstone project" />
				<link rel="icon" href="/Dashy.webp" />
			</Head>
			<DynamicWrapper>
				<StyledButton
					onClick={() => {
						router.push({
							pathname: '/create-invoice',
						});
					}}
				>
					Generate new Inoice
				</StyledButton>
				<StyledUl>
					{invoices?.map(invoice => {
						return (
							<li key={invoice.id}>
								<StyledParagraph>
									Inoice Id : <StyledSpan>{invoice.id}</StyledSpan>
									Client Name :<StyledSpan>{invoice.invoiceClient}</StyledSpan>
									Service : <StyledSpan>{invoice.invoiceService}</StyledSpan>
									Worked Hours :
									<StyledSpan>{invoice.invoiceWorkedHours}</StyledSpan>
									Price / Hour :
									<StyledSpan> {invoice.invoicePriceHour} €</StyledSpan>
									Tak Key : <StyledSpan>{invoice.invoiceTaxKey}%</StyledSpan>
									Subtotal : <StyledSpan>{invoice.invoiceSubtotal} €</StyledSpan>
									Taxes : <StyledSpan>{invoice.invoiceTaxes} €</StyledSpan>
									Invoice Total :<StyledSpan>{invoice.invoiceTotal} €</StyledSpan>
									Invoice Date : <StyledSpan>{invoice.invoiceDate}</StyledSpan>
									Invoice Due Date :
									<StyledSpan>{invoice.invoiceDueDate}</StyledSpan>
								</StyledParagraph>
							</li>
						);
					})}
				</StyledUl>
			</DynamicWrapper>
		</Layout>
	);
}
