import dynamic from 'next/dynamic';
import Head from 'next/head';
import Image from 'next/image';
import {useRouter} from 'next/router';

import Layout from '../components/Layout';
import StyledChangePictureButton from '../components/styledChangePictureButton';
import StyledProfileWrapper from '../components/styledProfileWrapper';
import useMyStore from '../hooks/useMyStore';

export default function Profile() {
	const router = useRouter();

	const myLogo = useMyStore(state => state.myLogo);
	const addLogo = useMyStore(state => state.addLogo);
	const myCompany = useMyStore(state => state.companyInfo);
	const DynamicWrapper = dynamic(() => import('../components/styledProfileWrapper'), {
		ssr: false,
	});
	const defaultLogo = '/defaultLogo.svg';

	function changeLogo() {
		addLogo(defaultLogo);
	}
	return (
		<Layout>
			<Head>
				<title key="title">Dashy</title>
				<meta key="description" name="description" content="This is my Capstone project" />
				<link rel="icon" href="/Dashy.webp" />
			</Head>
			<DynamicWrapper>
				<StyledProfileWrapper>
					<Image src={myLogo[0]} alt="Company Logo" height="150px" width="150px" />
					<StyledChangePictureButton onClick={changeLogo}>
						Upload your Own Logo
					</StyledChangePictureButton>
				</StyledProfileWrapper>
				<StyledProfileWrapper>
					<p>Your Info :</p>
					<p>{myCompany[0].myCompany}</p>
					<p>{myCompany[0].myCompanyAdress}</p>
					<p>{myCompany[0].myCompanyZipCode}</p>
					<p>{myCompany[0].myCompanyCity}</p>
					<p>{myCompany[0].myCompanyTaxID}</p>

					<button
						onClick={() => {
							router.push({
								pathname: '/create-my-company',
							});
						}}
					>
						Edit your Info
					</button>
				</StyledProfileWrapper>
			</DynamicWrapper>
		</Layout>
	);
}
