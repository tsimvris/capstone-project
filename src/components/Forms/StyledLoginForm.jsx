import {ErrorMessage} from '@hookform/error-message';
import {useRouter} from 'next/router';
import {useForm} from 'react-hook-form';

import StyledError from '../errors/styledError';

import StyledForm from './StyledComponents/styledForm';
import StyledWrapper from './StyledComponents/styledFormWrapper';
import StyledInput from './StyledComponents/styledInput';
import StyledLabel from './StyledComponents/styledLabel';
import StyledSubmitButton from './StyledComponents/styledSubmitButton';

export default function StyledLoginForm() {
	const router = useRouter();
	const {
		register,
		formState: {errors},
		handleSubmit,
	} = useForm({
		criteriaMode: 'all',
	});
	const onSubmit = data => {
		const user = {
			username: data.username,
			password: data.password,
		};
		router.push({
			pathname: '/dashboard',
		});
		console.log(user);
	};
	return (
		<StyledWrapper>
			<h2>Welcome to Dashy</h2>
			<StyledForm onSubmit={handleSubmit(onSubmit)}>
				<StyledLabel>
					Username
					<StyledInput
						placeholder="Großmeister91"
						type="text"
						{...register('username', {
							required: {value: true, message: 'This is required.'},
							minLength: {
								value: 3,
								message: 'Please enter a Valid Service Name.',
							},
						})}
					/>
					<ErrorMessage
						errors={errors}
						name="username"
						render={({messages}) =>
							messages &&
							Object.entries(messages).map(([type, message]) => (
								<StyledError key={type}>{message}</StyledError>
							))
						}
					/>
				</StyledLabel>
				<StyledLabel>
					Password
					<StyledInput
						placeholder="**********"
						type="password"
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
						name="password"
						render={({messages}) =>
							messages &&
							Object.entries(messages).map(([type, message]) => (
								<StyledError key={type}>{message}</StyledError>
							))
						}
					/>
				</StyledLabel>

				<StyledSubmitButton type="submit">Submit</StyledSubmitButton>
			</StyledForm>
		</StyledWrapper>
	);
}
