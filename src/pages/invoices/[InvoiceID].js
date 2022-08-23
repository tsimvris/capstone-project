import {Page, Text, View, Document, StyleSheet, PDFViewer} from '@react-pdf/renderer';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import {useRouter} from 'next/router';

import StyledSubmitButton from '../../components/Forms/StyledComponents/styledSubmitButton';
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
		width: '90vw',
		height: '90vh',
	},
	section: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		flexGrow: 1,
	},
	text: {
		display: 'flex',
		flexDirection: 'column',
		fontSize: 13,
		padding: 5,
	},
});
export default function MyDocument() {
	const router = useRouter();
	const myCompanyInfo = useMyStore(state => state.companyInfo);
	const DynamicWrapper = dynamic(() => import('../../components/styledClientWrapper'), {
		ssr: false,
	});
	const ref = router.query;
	const allInvoices = useClientStore(state => state.invoices);

	const invoiceArray = allInvoices.filter(ele => {
		return ele.id === ref.InvoiceID;
	});
	const wantedInvoice = invoiceArray[0];

	return (
		<DynamicWrapper>
			<Head>
				<title key="title">Dashy</title>
				<meta key="description" name="description" content="This is my Capstone project" />
				<link rel="icon" href="/Dashy.webp" />
			</Head>
			<StyledSubmitButton
				onClick={() => {
					router.push({
						pathname: '/invoices/invoice',
					});
				}}
			>
				Go Back
			</StyledSubmitButton>
			<PDFViewer style={styles.viewer}>
				<Document>
					<Page size="A4" style={styles.page}>
						<StyledCompanyDiv>
							<View style={styles.section} aria="my daten">
								<Text style={styles.text}>
									<b>{myCompanyInfo[0]?.myCompany}</b>
								</Text>
								<Text style={styles.text}>{myCompanyInfo[0]?.myCompanyAdress}</Text>
								<Text style={styles.text}>
									{myCompanyInfo[0]?.myCompanyZipCode}
								</Text>
								<Text style={styles.text}>{myCompanyInfo[0]?.myCompanyCity}</Text>
							</View>
						</StyledCompanyDiv>
						<View style={styles.section} aria="my daten">
							<Text style={styles.text}>
								<b>BILL TO</b>
								<Text style={styles.text}>{wantedInvoice?.invoiceClient}</Text>
							</Text>
						</View>
					</Page>
				</Document>
			</PDFViewer>
		</DynamicWrapper>
	);
}
