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
	const submitClientToBase = useClientStore(state => state.addClient);
	const router = useRouter();
	const {register, handleSubmit} = useForm();
	const onSubmit = data => {
		let client = {
			id: nanoid(),
			CompanyName: data.clientName,
			CompanyAdress: data.Adress,
			CompanyZipCode: data.postalCode,
			CompanyCity: data.city,
			CompanyTaxID: data.taxId,
		};
		submitClientToBase(client);
		router.push({
			pathname: '/Clients',
		});
	};

	return (
		<StyledWrapper>
			<StyledForm onSubmit={handleSubmit(onSubmit)}>
				<StyledLabel>
					Company Name <StyledInput {...register('clientName', {required: true})} />
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
					/>
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
						{...register('taxId', {required: true, min: '000000001', max: '999999999'})}
					/>
				</StyledLabel>

				<StyledSubmitButton type="submit">Submit</StyledSubmitButton>
			</StyledForm>
		</StyledWrapper>
	);
}
