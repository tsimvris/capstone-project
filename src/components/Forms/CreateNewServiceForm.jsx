import {ErrorMessage} from '@hookform/error-message';
import {nanoid} from 'nanoid';
import {useRouter} from 'next/router';
import {useForm} from 'react-hook-form';

import useServiceStore from '../../hooks/useServiceStore';
import StyledError from '../errors/styledError';
import StyledFieldset from '../Forms/StyledComponents/StyledFieldset';
import StyledNotice from '../Forms/styledNotice';

import StyledForm from './StyledComponents/styledForm';
import StyledWrapper from './StyledComponents/styledFormWrapper';
import StyledInput from './StyledComponents/styledInput';
import StyledLabel from './StyledComponents/styledLabel';
import StyledRadioInput0 from './StyledComponents/StyledRadioInput0';
import StyledRadioInput19 from './StyledComponents/StyledRadioInput19';
import StyledRadioInput7 from './StyledComponents/StyledRadioInput7';
import StyledSubmitButton from './StyledComponents/styledSubmitButton';

export default function CreateNewServiceForm() {
	const addService = useServiceStore(state => state.addService);
	const router = useRouter();
	const {
		register,
		formState: {errors},
		handleSubmit,
	} = useForm({
		criteriaMode: 'all',
	});
	const onSubmit = data => {
		const service = {
			id: nanoid(),
			serviceName: data.serviceName,
			serviceDescription: data.serviceDescription,
			servicePricePerHour: data.servicePricePerHour,
			serviceTaxKey: data.taxKey,
		};
		addService(service);
		router.push({
			pathname: '/services/services',
		});
	};

	return (
		<StyledWrapper>
			<StyledForm onSubmit={handleSubmit(onSubmit)}>
				<StyledLabel>
					Service Name
					<StyledInput
						placeholder="Coding"
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
						placeholder="Javascript, HTML, CSS, etc."
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
						placeholder="80 €"
						type="number"
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
								value: '[0-9]+[.,]+[0-9]',
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
				<StyledSubmitButton variant="default" type="submit">
					Submit
				</StyledSubmitButton>
				<StyledNotice>All input fields are required</StyledNotice>
			</StyledForm>
		</StyledWrapper>
	);
}
