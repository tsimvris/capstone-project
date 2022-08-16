import {ErrorMessage} from '@hookform/error-message';
import {useRouter} from 'next/router';
import {useForm} from 'react-hook-form';

import StyledForm from '../components/Forms/StyledComponents/styledForm';
import StyledInput from '../components/Forms/StyledComponents/styledInput';
import StyledLabel from '../components/Forms/StyledComponents/styledLabel';
import StyledSubmitButton from '../components/Forms/StyledComponents/styledSubmitButton';
import StyledWrapper from '../components/styledClientWrapper';
import useClientStore from '../hooks/useClientStore';

export default function EditClient() {
	const {
		register,
		formState: {errors},
		handleSubmit,
	} = useForm({
		criteriaMode: 'all',
	});
	const onSubmit = data => {
		wantedClient.CompanyAdress = data.Adress;
		wantedClient.CompanyCity = data.city;
		wantedClient.CompanyName = data.clientName;
		wantedClient.CompanyTaxID = data.taxId;
		wantedClient.CompanyZipCode = data.postalCode;
		router.push({
			pathname: '/clients',
		});
	};
	const router = useRouter();
	const ref = router.query;
	const allClients = useClientStore(state => state.clients);
	const clientsArray = allClients.filter(ele => {
		return ele.id === ref.CompanyID;
	});
	const wantedClient = clientsArray[0];

	return (
		<>
			<StyledWrapper>
				<StyledForm onSubmit={handleSubmit(onSubmit)}>
					<StyledLabel>
						Company Name
						<StyledInput
							defaultValue={wantedClient?.CompanyName}
							type="text"
							{...register('clientName', {
								required: {value: true, message: 'This is required.'},
								minLength: {
									value: 3,
									message: 'Please enter a Valid Company Name.',
								},
							})}
						/>
						<ErrorMessage
							errors={errors}
							name="clientName"
							render={({messages}) =>
								messages &&
								Object.entries(messages).map(([type, message]) => (
									<p key={type}>{message}</p>
								))
							}
						/>
					</StyledLabel>
					<StyledLabel>
						Street and Number
						<StyledInput
							defaultValue={wantedClient?.CompanyAdress}
							type="text"
							{...register('Adress', {
								required: {value: true, message: 'This is required.'},
								minLength: {
									value: 8,
									message: 'Please enter a existing Adress.',
								},
							})}
						/>
						<ErrorMessage
							errors={errors}
							name="Adress"
							render={({messages}) =>
								messages &&
								Object.entries(messages).map(([type, message]) => (
									<p key={type}>{message}</p>
								))
							}
						/>
					</StyledLabel>
					<StyledLabel>
						Postal Code
						<StyledInput
							defaultValue={wantedClient?.CompanyZipCode}
							type="number"
							{...register('postalCode', {
								required: true,
								maxLength: {
									value: 5,
									message: 'This input exceed maxLength.',
								},
								minLength: {
									value: 5,
									message: 'This input requires 5 numbers.',
								},
							})}
						/>
						<ErrorMessage
							errors={errors}
							name="postalCode"
							render={({messages}) =>
								messages &&
								Object.entries(messages).map(([type, message]) => (
									<p key={type}>{message}</p>
								))
							}
						/>
					</StyledLabel>
					<StyledLabel>
						City
						<StyledInput
							defaultValue={wantedClient?.CompanyCity}
							type="text"
							{...register('city', {
								required: {value: true, message: 'This is required.'},
								minLength: {
									value: 2,
									message: 'Please enter a existing City.',
								},
							})}
						/>
						<ErrorMessage
							errors={errors}
							name="city"
							render={({messages}) =>
								messages &&
								Object.entries(messages).map(([type, message]) => (
									<p key={type}>{message}</p>
								))
							}
						/>
					</StyledLabel>
					<StyledLabel>
						Tax ID
						<StyledInput
							defaultValue={wantedClient?.CompanyTaxID}
							type="number"
							{...register('taxId', {
								required: true,
								maxLength: {
									value: 10,
									message: 'This input exceed maxLength.',
								},
								minLength: {
									value: 8,
									message: 'This input requires min 8 numbers.',
								},
							})}
						/>
						<ErrorMessage
							errors={errors}
							name="taxId"
							render={({messages}) =>
								messages &&
								Object.entries(messages).map(([type, message]) => (
									<p key={type}>{message}</p>
								))
							}
						/>
					</StyledLabel>
					<StyledSubmitButton type="submit">Save</StyledSubmitButton>
				</StyledForm>
			</StyledWrapper>
		</>
	);
}
