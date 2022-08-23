import {Page, Text, View, Document, StyleSheet} from '@react-pdf/renderer';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import {useRouter} from 'next/router';

import StyledSubmitButton from '../../components/Forms/StyledComponents/styledSubmitButton';
import StyledButtonWrapper from '../../components/StyledInvoiceButtonWrapper';
import useClientStore from '../../hooks/useClientStore';
import useMyStore from '../../hooks/useMyStore';

import StyledCompanyDiv from './styledCompanyDiv';

const styles = StyleSheet.create({
	page: {
		display: 'flex',
		flexDirection: 'column',

		backgroundColor: '#ecf0f3',
	},
	viewer: {
		width: '99vw',
		height: '100vh',
	},
	myCompany: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		margin: '20px',
	},
	text: {
		display: 'flex',
		flexDirection: 'column',
		fontSize: 12,
		padding: 5,
	},
	strong: {
		fontWeight: 800,
		fontSize: 20,
		marginBottom: '10px',
		padding: '10px',
	},
	invoiceInfo: {
		fontWeight: 700,
		fontSize: 16,
		marginBottom: '10px',
	},
	secondRow: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: '20px',
		marginTop: '20px',
	},
	invoiceInfoContainer: {
		marginTop: '40px',
		marginRight: '20px',
	},
	invoiceTotal: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		fontWeight: 700,
	},
	InvoiceTotalWrapper: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',
	},
	highlight: {
		fontWeight: 800,
		fontSize: 20,
		paddingLeft: '10px',
		paddingRight: '10px',
	},
	serviceWrapper: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: '20px',
		marginTop: '20px',
	},
	serviceUnterWrapper: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	subtotal: {
		width: '100%',
		flexDirection: 'column',
		display: 'flex',
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
		marginRight: '20px',
		marginTop: '20px',
		paddingRight: '10px',
	},
	taxes: {
		display: 'flex',
		marginBottom: '20px',

		marginTop: '10px',
		paddingRight: '10px',
	},
	subInfo: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		height: 'auto',
		alignItems: 'center',
		marginTop: '150px',
		paddingBottom: '20px',
	},
});
export default function MyDocument() {
	const router = useRouter();
	const myCompanyInfo = useMyStore(state => state.companyInfo);
	const allInvoices = useClientStore(state => state.invoices);
	const allClients = useClientStore(state => state.clients);
	const DynamicWrapper = dynamic(() => import('../../components/StyledInvoiceWrapper'), {
		ssr: false,
	});
	const ref = router.query;
	const invoiceArray = allInvoices.filter(ele => {
		return ele.id === ref.InvoiceID;
	});
	const wantedInvoice = invoiceArray[0];
	const wantedClient = allClients.filter(ele => {
		return ele.CompanyName === wantedInvoice?.invoiceClient;
	});

	return (
		<DynamicWrapper>
			<Head>
				<title key="title">Dashy</title>
				<meta key="description" name="description" content="This is my Capstone project" />
				<link rel="icon" href="/Dashy.webp" />
			</Head>
			<StyledButtonWrapper>
				<StyledSubmitButton>
					<a href="javascript:window.print()">Download this as a PDF</a>
				</StyledSubmitButton>
			</StyledButtonWrapper>
			<Document>
				<Page size="A4" style={styles.page}>
					<StyledCompanyDiv>
						<View style={styles.myCompany} aria="My Data">
							<Text style={styles.text}>
								<b>{myCompanyInfo[0]?.myCompany}</b>
							</Text>
							<Text style={styles.text}>{myCompanyInfo[0]?.myCompanyAdress}</Text>
							<Text style={styles.text}>{myCompanyInfo[0]?.myCompanyZipCode}</Text>
							<Text style={styles.text}>{myCompanyInfo[0]?.myCompanyCity}</Text>
						</View>
					</StyledCompanyDiv>
					<View style={styles.secondRow}>
						<View style={styles.myCompany} aria="Client Data">
							<Text style={styles.strong}>BILL TO</Text>
							<Text style={styles.text}>{wantedClient[0]?.CompanyName}</Text>
							<Text style={styles.text}>{wantedClient[0]?.CompanyAdress}</Text>
							<Text style={styles.text}>{wantedClient[0]?.CompanyZipCode} </Text>
							<Text style={styles.text}>{wantedClient[0]?.CompanyCity}</Text>
						</View>
						<View style={styles.invoiceInfoContainer} aria="Invoice Date and Number">
							<Text style={styles.text}>
								<Text style={styles.invoiceInfo}>Invoice ID : </Text>
								{wantedInvoice?.id}
							</Text>
							<Text style={styles.text}>
								<Text style={styles.invoiceInfo}>Invoice Date : </Text>
								{wantedInvoice?.invoiceDate}
							</Text>
							<Text style={styles.text}>
								<Text style={styles.invoiceInfo}>Due Date : </Text>
								{wantedInvoice?.invoiceDueDate}
							</Text>
						</View>
					</View>

					<View style={styles.serviceWrapper} aria="Invoice Services">
						<View style={styles.serviceUnterWrapper} aria="service description">
							<Text style={styles.strong}>Service Description</Text>
							<Text>{wantedInvoice?.invoiceService}</Text>
						</View>
						<View style={styles.serviceUnterWrapper} aria="Price / Hour">
							<Text style={styles.strong}>Hourly Rate</Text>
							<Text>{wantedInvoice?.invoicePriceHour} €</Text>
						</View>
						<View style={styles.serviceUnterWrapper} aria="Subtotal">
							<Text style={styles.strong}>Amount</Text>
							<Text>{wantedInvoice?.invoiceSubtotal} €</Text>
						</View>
					</View>

					<View style={styles.subtotal} aria="Invoice Subtotal and taxes">
						<Text style={styles.taxes}>
							Subtotal :<Text>{wantedInvoice?.invoiceSubtotal} €</Text>
						</Text>
						<Text style={styles.taxes}>
							Sales Tax {wantedInvoice?.invoiceTaxKey}% :
							<Text>{wantedInvoice?.invoiceTaxes} €</Text>
						</Text>
					</View>
					<View style={styles.invoiceTotal} aria="Invoice Total">
						<View style={styles.InvoiceTotalWrapper}>
							<Text style={styles.highlight}>Invoice Total : </Text>
							<Text style={styles.highlight}>{wantedInvoice?.invoiceTotal} €</Text>
						</View>
					</View>
					<View style={styles.subInfo} aria="Terms and Conditions">
						<Text>{wantedInvoice?.invoicePaymentDue}</Text>
						<Text>Bank : {wantedInvoice?.invoiceBank}</Text>
						<Text>IBAN : {wantedInvoice?.invoiceIban}</Text>
						<Text>Payment Reference : {wantedInvoice?.invoicePaymentReference}</Text>
					</View>
				</Page>
			</Document>
		</DynamicWrapper>
	);
}
