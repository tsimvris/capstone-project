import {ErrorMessage} from '@hookform/error-message';
import Head from 'next/head';
import {useRouter} from 'next/router';
import {useForm} from 'react-hook-form';

import StyledError from '../../components/errors/styledError';
import StyledFieldset from '../../components/Forms/StyledComponents/StyledFieldset';
import StyledForm from '../../components/Forms/StyledComponents/styledForm';
import StyledInput from '../../components/Forms/StyledComponents/styledInput';
import StyledLabel from '../../components/Forms/StyledComponents/styledLabel';
import StyledRadioInput0 from '../../components/Forms/StyledComponents/styledRadioInput0';
import StyledRadioInput19 from '../../components/Forms/StyledComponents/styledRadioInput19';
import StyledRadioInput7 from '../../components/Forms/StyledComponents/styledRadioInput7';
import StyledSubmitButton from '../../components/Forms/StyledComponents/styledSubmitButton';
import Layout from '../../components/Layout';
import StyledWrapper from '../../components/styledClientWrapper';
import useServiceStore from '../../hooks/useServiceStore';

export default function EditServices() {
	const {
		register,
		formState: {errors},
		handleSubmit,
	} = useForm({
		criteriaMode: 'all',
	});

	const router = useRouter();
	const ref = router.query;
	console.log(ref);
	const allServices = useServiceStore(state => state.services);
	const servicesArray = allServices.filter(ele => {
		return ele.id === ref.ServiceID;
	});
	const wantedService = servicesArray[0];
	const onSubmit = data => {
		wantedService.serviceName = data.serviceName;
		wantedService.serviceDescription = data.serviceDescription;
		wantedService.servicePricePerHour = data.servicePricePerHour;
		wantedService.serviceTaxKey = data.taxKey;
		router.push({
			pathname: '/services/services',
		});
	};
	return (
		<Layout>
			<Head>
				<title key="title">Dashy</title>
				<meta key="description" name="description" content="This is my Capstone project" />
				<link rel="icon" href="/Dashy.webp" />
			</Head>
			<StyledWrapper>
				<StyledForm onSubmit={handleSubmit(onSubmit)}>
					<StyledLabel>
						Service Name
						<StyledInput
							defaultValue={wantedService?.serviceName}
							type="text"
							{...register('serviceName', {
								required: {value: true, message: 'This is required.'},
								minLength: {
									value: 3,
									message: 'Please enter a Valid Service Name.',
								},
							})}
						/>
						<ErrorMessage
							errors={errors}
							name="serviceName"
							render={({messages}) =>
								messages &&
								Object.entries(messages).map(([type, message]) => (
									<StyledError key={type}>{message}</StyledError>
								))
							}
						/>
					</StyledLabel>
					<StyledLabel>
						Service Description
						<StyledInput
							defaultValue={wantedService?.serviceDescription}
							type="text"
							{...register('serviceDescription', {
								required: {value: true, message: 'This is required.'},
								minLength: {
									value: 8,
									message: 'Please enter a valid Description.',
								},
							})}
						/>
						<ErrorMessage
							errors={errors}
							name="serviceDescription"
							render={({messages}) =>
								messages &&
								Object.entries(messages).map(([type, message]) => (
									<StyledError key={type}>{message}</StyledError>
								))
							}
						/>
					</StyledLabel>
					<StyledLabel>
						Price / Hour
						<StyledInput
							defaultValue={wantedService?.servicePricePerHour}
							type="text"
							{...register('servicePricePerHour', {
								required: {value: true, message: 'This is required.'},
								maxLength: {
									value: 4,
									message: 'This Input can be maximum 4 characters long.',
								},
								minLength: {
									value: 1,
									message: 'This input requires at least 1 character.',
								},
								pattern: {
									value: '[0-9]+([.,][0-9]+)?',
									message: 'This input is number only.',
								},
							})}
						/>
						<ErrorMessage
							errors={errors}
							name="servicePricePerHour"
							render={({messages}) =>
								messages &&
								Object.entries(messages).map(([type, message]) => (
									<StyledError key={type}>{message}</StyledError>
								))
							}
						/>
					</StyledLabel>
					<StyledLabel>
						Tax Key
						<StyledFieldset>
							<StyledRadioInput0
								value="0"
								name="taxKey"
								type="radio"
								{...register('taxKey')}
							/>

							<StyledRadioInput7
								value="7"
								name="taxKey"
								type="radio"
								{...register('taxKey')}
							/>

							<StyledRadioInput19
								name="taxKey"
								type="radio"
								value="19"
								checked
								{...register('taxKey')}
							/>
						</StyledFieldset>
					</StyledLabel>
					<StyledSubmitButton type="submit">Save</StyledSubmitButton>
				</StyledForm>
			</StyledWrapper>
		</Layout>
	);
}
