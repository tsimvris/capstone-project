import {ErrorMessage} from '@hookform/error-message';
import {nanoid} from 'nanoid';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Image from 'next/image';
import {useForm} from 'react-hook-form';

import StyledError from '../components/errors/styledError';
import StyledForm from '../components/Forms/StyledComponents/styledForm';
import StyledInput from '../components/Forms/StyledComponents/styledInput';
import StyledLabel from '../components/Forms/StyledComponents/styledLabel';
import StyledSubmitButton from '../components/Forms/StyledComponents/styledSubmitButton';
import StyledNotice from '../components/Forms/styledNotice';
import Layout from '../components/Layout';
import StyledWrapper from '../components/styledClientWrapper';
import useMyStore from '../hooks/useMyStore';

export default function Profile() {
	const myCompany = useMyStore(state => state.companyInfo);
	const addCompanyInfo = useMyStore(state => state.addCompanyInfo);
	const DynamicWrapper = dynamic(() => import('../components/styledClientWrapper'), {
		ssr: false,
	});
	const {
		register,
		reset,
		formState: {errors},
		handleSubmit,
	} = useForm({
		criteriaMode: 'all',
	});
	const onSubmit = data => {
		let companyInfo = {
			id: nanoid(),
			myCompanyName: data.myCompanyName,
			myCompanyAdress: data.myAdress,
			myCompanyZipCode: data.myPostalCode,
			myCompanyCity: data.myCity,
			myCompanyTaxID: data.myTaxId,
		};
		addCompanyInfo(companyInfo);
		reset({...data});
	};

	return (
		<Layout>
			<Head>
				<title key="title">Dashy</title>
				<meta key="description" name="description" content="This is my Capstone project" />
				<link rel="icon" href="/Dashy.webp" />
			</Head>
			<DynamicWrapper>
				<div>
					<Image />
					<button>Change Pic</button>
				</div>
				<StyledWrapper>
					<StyledForm onSubmit={handleSubmit(onSubmit)}>
						<StyledLabel>
							Company Name
							<StyledInput
								defaultValue={myCompany.myCompanyName}
								type="text"
								{...register('myCompanyName', {
									required: {value: true, message: 'This field is required.'},
									minLength: {
										value: 3,
										message: 'Please enter a Valid Company Name.',
									},
								})}
							/>
							<ErrorMessage
								errors={errors}
								name="myCompanyName"
								render={({messages}) =>
									messages &&
									Object.entries(messages).map(([type, message]) => (
										<StyledError key={type}>{message}</StyledError>
									))
								}
							/>
						</StyledLabel>
						<StyledLabel>
							Street and Number
							<StyledInput
								type="text"
								{...register('myAdress', {
									required: {value: true, message: 'This field is required.'},
									minLength: {
										value: 8,
										message: 'Please enter a existing Adress.',
									},
								})}
							/>
							<ErrorMessage
								errors={errors}
								name="myAdress"
								render={({messages}) =>
									messages &&
									Object.entries(messages).map(([type, message]) => (
										<StyledError key={type}>{message}</StyledError>
									))
								}
							/>
						</StyledLabel>
						<StyledLabel>
							Postal Code
							<StyledInput
								type="number"
								{...register('myPostalCode', {
									required: {value: true, message: 'This field is required.'},
									maxLength: {
										value: 5,
										message: 'This input requires 5 characters.',
									},
									minLength: {
										value: 5,
										message: 'This input requires 5 characters.',
									},
									pattern: {
										value: '[0-9]?',
										message: 'This input is number only.',
									},
								})}
							/>
							<ErrorMessage
								errors={errors}
								name="myPostalCode"
								render={({messages}) =>
									messages &&
									Object.entries(messages).map(([type, message]) => (
										<StyledError key={type}>{message}</StyledError>
									))
								}
							/>
						</StyledLabel>
						<StyledLabel>
							City
							<StyledInput
								type="text"
								{...register('myCity', {
									required: {value: true, message: 'This field is required.'},
									minLength: {
										value: 2,
										message: 'Please enter a existing City.',
									},
								})}
							/>
							<ErrorMessage
								errors={errors}
								name="myCity"
								render={({messages}) =>
									messages &&
									Object.entries(messages).map(([type, message]) => (
										<StyledError key={type}>{message}</StyledError>
									))
								}
							/>
						</StyledLabel>
						<StyledLabel>
							Tax ID
							<StyledInput
								type="text"
								{...register('myTaxId', {
									required: {value: true, message: 'This field is required.'},
									maxLength: {
										value: 10,
										message: 'Tax Id length is between 8 and 10 characters.',
									},
									minLength: {
										value: 8,
										message: 'Tax Id length is between 8 and 10 characters.',
									},
									pattern: {
										value: '[0-9]?',
										message: 'This input is number only.',
									},
								})}
							/>
							<ErrorMessage
								errors={errors}
								name="myTaxId"
								render={({messages}) =>
									messages &&
									Object.entries(messages).map(([type, message]) => (
										<StyledError key={type}>{message}</StyledError>
									))
								}
							/>
						</StyledLabel>
						<StyledSubmitButton name="submitButton" type="submit">
							Save
						</StyledSubmitButton>
						<StyledNotice>All input fields are required</StyledNotice>
					</StyledForm>
				</StyledWrapper>
			</DynamicWrapper>
		</Layout>
	);
}
