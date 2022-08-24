import dynamic from 'next/dynamic';
import Head from 'next/head';
import {useRouter} from 'next/router';

import StyledSubmitButton from '../../components/Forms/StyledComponents/styledSubmitButton';
import Layout from '../../components/Layout';
import StyledUl from '../../components/serviceUI/styledUL';
import StyledButton from '../../components/styledButton';
import StyledInvoiceParagraph from '../../components/styledInvoiceParagraph';
import StyledShowPdfWrapper from '../../components/styledShowPdfWrapper';
import StyledSpan from '../../components/styledSpan';
import useClientStore from '../../hooks/useClientStore';

export default function Invoice() {
	const DynamicWrapper = dynamic(() => import('../../components/styledClientWrapper'), {
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
							pathname: '/invoices/create-invoice',
						});
					}}
				>
					Generate new Inoice
				</StyledButton>

				<StyledUl>
					{invoices?.map(invoice => {
						return (
							<li key={invoice.id}>
								<StyledInvoiceParagraph>
									Invoice Id : <StyledSpan>{invoice.id}</StyledSpan>
									Client Name :<StyledSpan>{invoice.invoiceClient}</StyledSpan>
									Service : <StyledSpan>{invoice.invoiceService}</StyledSpan>
									Worked Hours :
									<StyledSpan>{invoice.invoiceWorkedHours}</StyledSpan>
									Price / Hour :
									<StyledSpan> {invoice.invoicePriceHour} €</StyledSpan>
									Tax Key : <StyledSpan>{invoice.invoiceTaxKey}%</StyledSpan>
									Subtotal : <StyledSpan>{invoice.invoiceSubtotal} €</StyledSpan>
									Taxes : <StyledSpan>{invoice.invoiceTaxes} €</StyledSpan>
									Invoice Total :<StyledSpan>{invoice.invoiceTotal} €</StyledSpan>
									Invoice Date : <StyledSpan>{invoice.invoiceDate}</StyledSpan>
									Invoice Due Date :
									<StyledSpan>{invoice.invoiceDueDate}</StyledSpan>
									Bank :<StyledSpan>{invoice.invoiceBank}</StyledSpan>
									IBAN :<StyledSpan>{invoice.invoiceIban}</StyledSpan>
									Payment Reference:
									<StyledSpan>{invoice.invoicePaymentReference}</StyledSpan>
									<StyledShowPdfWrapper>
										<StyledSubmitButton
											variant="default"
											onClick={() => {
												router.push({
													pathname: `/invoices/${invoice.id}`,
													query: {keyword: 'InvoiceId'},
												});
											}}
										>
											Show PDF
										</StyledSubmitButton>
									</StyledShowPdfWrapper>
								</StyledInvoiceParagraph>
							</li>
						);
					})}
				</StyledUl>
			</DynamicWrapper>
		</Layout>
	);
}
