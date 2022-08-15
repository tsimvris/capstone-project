import {ErrorMessage} from '@hookform/error-message';
import {nanoid} from 'nanoid';
import {useRouter} from 'next/router';
import {useForm} from 'react-hook-form';

import useClientStore from '../../hooks/useClientStore';

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
			pathname: '/',
		});
	};

	return (
		<StyledWrapper>
			<StyledForm onSubmit={handleSubmit(onSubmit)}>
				<StyledLabel>
					Company Name
					<StyledInput {...register('clientName', {required: true})} />
				</StyledLabel>
				<StyledLabel>
					Street and Number
					<StyledInput {...register('clientAdress', {required: true})} />
				</StyledLabel>
				<StyledLabel>
					Postal Code
					<StyledInput
						type="number"
						{...register('postalCode', {required: true, min: '00001', max: '99999'})}
					/>{' '}
					{errors.postalCode && <p>{errors.postalCode?.message}</p>}
				</StyledLabel>
				<StyledLabel>
					City
					<StyledInput
						type="text"
						{...register('city', {
							required: true,
						})}
					/>
				</StyledLabel>
				<StyledLabel>
					Tax ID
					<StyledInput
						type="number"
						{...register('multipleErrorInput', {
							required: 'This is required.',
							pattern: {
								value: /d+/,
								message: 'This input is number only.',
							},
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
						name="multipleErrorInput"
						render={({messages}) =>
							messages &&
							Object.entries(messages).map(([type, message]) => (
								<p key={type}>{message}</p>
							))
						}
					/>
				</StyledLabel>
				<StyledSubmitButton type="submit">Submit</StyledSubmitButton>
			</StyledForm>
		</StyledWrapper>
	);
}
