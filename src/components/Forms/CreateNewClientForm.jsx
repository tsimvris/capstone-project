import {ErrorMessage} from '@hookform/error-message';
import {nanoid} from 'nanoid';
import {useRouter} from 'next/router';
import {useForm} from 'react-hook-form';

import useClientStore from '../../hooks/useClientStore';
import StyledError from '../errors/styledError';
import StyledNotice from '../Forms/styledNotice';

import StyledForm from './StyledComponents/styledForm';
import StyledWrapper from './StyledComponents/styledFormWrapper';
import StyledInput from './StyledComponents/styledInput';
import StyledLabel from './StyledComponents/styledLabel';
import StyledSubmitButton from './StyledComponents/styledSubmitButton';

export default function CreateNewClientForm() {
	const addClient = useClientStore(state => state.addClient);
	const router = useRouter();
	const {
		register,
		formState: {errors},
		handleSubmit,
	} = useForm({
		criteriaMode: 'all',
	});
	const onSubmit = data => {
		let client = {
			id: nanoid(),
			CompanyName: data.clientName,
			CompanyAdress: data.Adress,
			CompanyZipCode: data.postalCode,
			CompanyCity: data.city,
			CompanyTaxID: data.taxId,
		};
		addClient(client);
		router.push({
			pathname: '/clients/clients',
		});
	};

	return (
		<StyledWrapper>
			<StyledForm onSubmit={handleSubmit(onSubmit)}>
				<StyledLabel>
					Company Name
					<StyledInput
						type="text"
						{...register('clientName', {
							required: {value: true, message: 'This field is required.'},
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
								<StyledError key={type}>{message}</StyledError>
							))
						}
					/>
				</StyledLabel>
				<StyledLabel>
					Street and Number
					<StyledInput
						type="text"
						{...register('Adress', {
							required: {value: true, message: 'This field is required.'},
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
								<StyledError key={type}>{message}</StyledError>
							))
						}
					/>
				</StyledLabel>
				<StyledLabel>
					Postal Code
					<StyledInput
						type="number"
						{...register('postalCode', {
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
						name="postalCode"
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
						{...register('city', {
							required: {value: true, message: 'This field is required.'},
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
								<StyledError key={type}>{message}</StyledError>
							))
						}
					/>
				</StyledLabel>
				<StyledLabel>
					Tax ID
					<StyledInput
						type="text"
						{...register('taxId', {
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
						name="taxId"
						render={({messages}) =>
							messages &&
							Object.entries(messages).map(([type, message]) => (
								<StyledError key={type}>{message}</StyledError>
							))
						}
					/>
				</StyledLabel>
				<StyledSubmitButton name="submitButton" type="submit">
					Submit
				</StyledSubmitButton>
				<StyledNotice>All input fields are required</StyledNotice>
			</StyledForm>
		</StyledWrapper>
	);
}
