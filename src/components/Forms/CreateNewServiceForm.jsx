import {ErrorMessage} from '@hookform/error-message';
import {nanoid} from 'nanoid';
import {useRouter} from 'next/router';
import {useForm} from 'react-hook-form';

import useServiceStore from '../../hooks/useServiceStore';

import StyledForm from './StyledComponents/styledForm';
import StyledWrapper from './StyledComponents/styledFormWrapper';
import StyledInput from './StyledComponents/styledInput';
import StyledLabel from './StyledComponents/styledLabel';
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
			pathname: '/services',
		});
	};

	return (
		<StyledWrapper>
			<StyledForm onSubmit={handleSubmit(onSubmit)}>
				<StyledLabel>
					Service Name
					<StyledInput
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
								<p key={type}>{message}</p>
							))
						}
					/>
				</StyledLabel>
				<StyledLabel>
					Service Description
					<StyledInput
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
								<p key={type}>{message}</p>
							))
						}
					/>
				</StyledLabel>
				<StyledLabel>
					Price / Hour
					<StyledInput
						type="number"
						{...register('servicePricePerHour', {
							required: true,
							maxLength: {
								value: 4,
								message: 'This input exceed the maximal length.',
							},
							minLength: {
								value: 1,
								message: 'This input requires at least 1 number.',
							},
						})}
					/>
					<ErrorMessage
						errors={errors}
						name="servicePricePerHour"
						render={({messages}) =>
							messages &&
							Object.entries(messages).map(([type, message]) => (
								<p key={type}>{message}</p>
							))
						}
					/>
				</StyledLabel>
				<StyledLabel>
					Tax Key
					<StyledInput
						type="number"
						{...register('taxKey', {
							required: {value: true, message: 'This is required.'},
							minLength: {
								value: 1,
								message: 'Please enter a valid Tax Key(7 or 19 %).',
							},
							maxLength: {
								value: 2,
								message: 'This input exceed the maximal length.',
							},
						})}
					/>
					<ErrorMessage
						errors={errors}
						name="taxKey"
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
