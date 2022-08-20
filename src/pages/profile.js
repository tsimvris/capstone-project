import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Image from 'next/image';
import {useRouter} from 'next/router';
import {useState} from 'react';

import StyledEditButton from '../components/Forms/StyledComponents/styledEditButton';
import Layout from '../components/Layout';
import StyledImageContainer from '../components/menu/StyledImageContainer';
import StyledChangePictureButton from '../components/styledChangePictureButton';
import StyledH2Container from '../components/styledH2';
import StyledImageInput from '../components/StyledImageInput';
import StyledParagraph from '../components/styledParagraph';
import StyledProfileWrapper from '../components/styledProfileWrapper';
import StyledSpan from '../components/styledSpan';
import StyledUploadLabel from '../components/StyledUploadLabel';
import {storage} from '../hooks/firebase';
import useMyStore from '../hooks/useMyStore';
export default function Profile() {
	const router = useRouter();
	const [image, setImage] = useState('');
	const myLogo = useMyStore(state => state.myLogo);
	const addLogo = useMyStore(state => state.addLogo);
	const myCompany = useMyStore(state => state.companyInfo);
	const DynamicWrapper = dynamic(() => import('../components/styledProfileWrapper'), {
		ssr: false,
	});
	const defaultLogo = '/defaultLogo.svg';
	if (myLogo.length === 0) {
		addLogo(defaultLogo);
	}
	const handleImageChange = e => {
		if (e.target.files[0]) {
			setImage(e.target.files[0]);
		}
		console.log(image);
	};

	const handleSubmit = () => {
		const imageRef = ref(storage, 'image');
		uploadBytes(imageRef, image)
			.then(() => {
				getDownloadURL(imageRef)
					.then(url => {
						addLogo(url);
					})
					.catch(error => {
						console.log(error.message, 'problem getting the URL');
					});
				setImage(null);
			})
			.catch(error => {
				console.log(error.message, 'problem uploading the Image');
			});
	};
	return (
		<Layout>
			<Head>
				<title key="title">Dashy</title>
				<meta key="description" name="description" content="This is my Capstone project" />
				<link rel="icon" href="/Dashy.webp" />
			</Head>
			<DynamicWrapper>
				<StyledProfileWrapper>
					<StyledImageContainer>
						<Image
							src={myLogo[0]}
							alt="Company Logo"
							height="150px"
							width="150px"
							style={{borderRadius: '50%'}}
						/>
					</StyledImageContainer>

					<StyledUploadLabel>
						Search for an Image
						<StyledImageInput ref={ref} type="file" onChange={handleImageChange} />
					</StyledUploadLabel>
					{image?.name ? <p>Your selected file : {image?.name}</p> : ''}

					<StyledChangePictureButton onClick={handleSubmit}>
						Click to Upload
					</StyledChangePictureButton>
				</StyledProfileWrapper>
				<StyledProfileWrapper>
					<StyledH2Container>
						<h2>Your Info :</h2>
					</StyledH2Container>
					<div>
						<StyledParagraph>
							Company Name : <StyledSpan>{myCompany[0]?.myCompany}</StyledSpan>
							Company Adress :<StyledSpan>{myCompany[0]?.myCompanyAdress}</StyledSpan>
							Company Postal Code :
							<StyledSpan>{myCompany[0]?.myCompanyZipCode}</StyledSpan>
							Company City : <StyledSpan>{myCompany[0]?.myCompanyCity}</StyledSpan>
							Company Tax Id : <StyledSpan>{myCompany[0]?.myCompanyTaxID}</StyledSpan>
						</StyledParagraph>
					</div>
					<StyledEditButton
						onClick={() => {
							router.push({
								pathname: '/create-my-company',
							});
						}}
					>
						Edit your Info
					</StyledEditButton>
				</StyledProfileWrapper>
			</DynamicWrapper>
		</Layout>
	);
}
