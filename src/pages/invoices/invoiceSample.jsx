import {Page, Text, View, Document, StyleSheet} from '@react-pdf/renderer';
import dynamic from 'next/dynamic';

import useMyStore from '../../hooks/useMyStore';
const styles = StyleSheet.create({
	page: {
		margin: 10,
		padding: 10,
		backgroundColor: '#ecf0f3',
	},
	section: {
		flexGrow: 1,
	},
	text: {
		display: 'flex',
		flexDirection: 'column',
		fontSize: 16,
		padding: 5,
	},
});
export default function MyDocument() {
	const myCompanyInfo = useMyStore(state => state.companyInfo);
	const DynamicWrapper = dynamic(() => import('../../components/styledClientWrapper'), {
		ssr: false,
	});
	return (
		<DynamicWrapper>
			<Document>
				<Page size="A4" style={styles.page}>
					<View style={styles.section} aria="my daten">
						<Text style={styles.text}>{myCompanyInfo[0]?.myCompany}</Text>
						<Text style={styles.text}>{myCompanyInfo[0]?.myCompanyAdress}</Text>
						<Text style={styles.text}>{myCompanyInfo[0]?.myCompanyZipCode}</Text>
						<Text style={styles.text}>{myCompanyInfo[0]?.myCompanyCity}</Text>
						<Text style={styles.text}>{myCompanyInfo[0]?.myCompanyTaxID}</Text>
					</View>
				</Page>
			</Document>
		</DynamicWrapper>
	);
}
