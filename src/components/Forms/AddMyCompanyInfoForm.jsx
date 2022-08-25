import {ErrorMessage} from '@hookform/error-message';
import {nanoid} from 'nanoid';
import {useRouter} from 'next/router';
import {useForm} from 'react-hook-form';

import useMyStore from '../../hooks/useMyStore';
import StyledError from '../errors/styledError';
import StyledNotice from '../Forms/styledNotice';

import StyledForm from './StyledComponents/styledForm';
import StyledWrapper from './StyledComponents/styledFormWrapper';
import StyledInput from './StyledComponents/styledInput';
import StyledLabel from './StyledComponents/styledLabel';
import StyledSubmitButton from './StyledComponents/styledSubmitButton';

export default function CreateNewClientForm() {
	const addCompanyInfo = useMyStore(state => state.addCompanyInfo);
	const myCompany = useMyStore(state => state.companyInfo);

	const router = useRouter();
	const {
		register,
		formState: {errors},
		handleSubmit,
	} = useForm({
		criteriaMode: 'all',
	});
	const onSubmit = data => {
		let companyInfo = {
			id: nanoid(),
			myCompany: data.myCompanyName,
			myCompanyAdress: data.myAdress,
			myCompanyZipCode: data.myPostalCode,
			myCompanyCity: data.myCity,
			myCompanyTaxID: data.myTaxId,
			myBank: data.myBank,
			myIban: data.myIban,
		};
		addCompanyInfo(companyInfo);
		router.push({
			pathname: '/profile',
		});
	};

	return (
		<StyledWrapper>
			<StyledForm onSubmit={handleSubmit(onSubmit)}>
				<StyledLabel>
					Company Name
					<StyledInput
						placeholder="My Company"
						defaultValue={myCompany[0]?.myCompany}
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
						placeholder="My Street 12"
						defaultValue={myCompany[0]?.myCompanyAdress}
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
						placeholder="12345"
						defaultValue={myCompany[0]?.myCompanyZipCode}
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
						placeholder="Leipzig"
						defaultValue={myCompany[0]?.myCompanyCity}
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
						placeholder="123456789"
						defaultValue={myCompany[0]?.myCompanyTaxID}
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
				<StyledLabel>
					Bank
					<StyledInput
						placeholder="Deutsche Bank"
						defaultValue={myCompany[0]?.myBank}
						type="text"
						{...register('myBank', {
							required: {value: true, message: 'This field is required.'},
							minLength: {
								value: 5,
								message: 'Please enter a Valid Bank Name.',
							},
						})}
					/>
					<ErrorMessage
						errors={errors}
						name="myBank"
						render={({messages}) =>
							messages &&
							Object.entries(messages).map(([type, message]) => (
								<StyledError key={type}>{message}</StyledError>
							))
						}
					/>
				</StyledLabel>
				<StyledLabel>
					IBAN
					<StyledInput
						placeholder="DE89370400440532013000"
						defaultValue={myCompany[0]?.myIban}
						type="text"
						{...register('myIban', {
							required: {value: true, message: 'This field is required.'},
							maxLength: {
								value: 22,
								message: 'Iban length is 22 characters.',
							},
							minLength: {
								value: 22,
								message: 'Iban length is 22 characters.',
							},
						})}
					/>
					<ErrorMessage
						errors={errors}
						name="myIban"
						render={({messages}) =>
							messages &&
							Object.entries(messages).map(([type, message]) => (
								<StyledError key={type}>{message}</StyledError>
							))
						}
					/>
				</StyledLabel>
				<StyledSubmitButton variant="default" name="submitButton" type="submit">
					Save
				</StyledSubmitButton>
				<StyledNotice>All input fields are required</StyledNotice>
			</StyledForm>
		</StyledWrapper>
	);
}
