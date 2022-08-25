import {ErrorMessage} from '@hookform/error-message';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Image from 'next/image';
import {useRouter} from 'next/router';
import {useForm} from 'react-hook-form';

import StyledError from '../components/errors/styledError';
import StyledInput from '../components/Forms/StyledComponents/styledInput';
import StyledLabel from '../components/Forms/StyledComponents/styledLabel';
import StyledSubmitButton from '../components/Forms/StyledComponents/styledSubmitButton';
import StyledLoginForm from '../components/login/StyledLoginForm';
import StyledSignupCheckbox from '../components/login/StyledSignupCheckbox';
import StyledSignupLabel from '../components/login/StyledSignupLabel';
import useMyStore from '../hooks/useMyStore';
import useUserStore from '../hooks/useUserStore';
export default function Signup() {
	const signupUser = useUserStore(state => state.signupUser);
	const DynamicWrapper = dynamic(() => import('../components/login/styledLoginWrapper'), {
		ssr: false,
	});
	const addLogo = useMyStore(state => state.addLogo);
	const myLogo = useMyStore(state => state.myLogo);
	const router = useRouter();
	const {
		register,
		formState: {errors},
		handleSubmit,
	} = useForm({
		criteriaMode: 'all',
	});
	const onSubmit = data => {
		const userCredential = {
			username: data.username,
			password: data.password,
			checkbox: data.checkbox,
			isLoggedIn: false,
		};
		router.push({
			pathname: '/',
		});
		signupUser(userCredential);
	};
	const defaultLogo = '/defaultLogo.svg';
	if (myLogo.length === 0) {
		addLogo(defaultLogo);
	}
	return (
		<>
			<Head>
				<title key="title">Dashy Signup</title>
				<meta key="description" name="description" content="This is my Capstone project" />
				<link rel="icon" href="/Dashy.webp" />
			</Head>
			<DynamicWrapper>
				<StyledLoginForm onSubmit={handleSubmit(onSubmit)}>
					<Image
						src="/defaultLogo.svg"
						alt="Company Logo"
						height="100px"
						width="100px"
						style={{borderRadius: '50%'}}
					/>
					<h2>Signup to Dashy</h2>
					<StyledLabel>
						Username
						<StyledInput
							placeholder="username"
							type="text"
							{...register('username', {
								required: {value: true, message: 'This is required.'},
								minLength: {
									value: 3,
									message: 'Please enter a valid username.',
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
							{...register('password', {
								required: {value: true, message: 'This is required.'},
								minLength: {
									value: 8,
									message: 'Min length is 8 characters.',
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

					<StyledSignupLabel>
						I accept the Terms & Conditions
						<StyledSignupCheckbox
							value={true}
							type="checkbox"
							{...register('checkbox', {
								required: {value: true, message: 'This is required.'},
							})}
						/>
						<ErrorMessage
							errors={errors}
							name="checkbox"
							render={({messages}) =>
								messages &&
								Object.entries(messages).map(([type, message]) => (
									<StyledError key={type}>{message}</StyledError>
								))
							}
						/>
					</StyledSignupLabel>

					<StyledSubmitButton variant="login" type="submit">
						Signup
					</StyledSubmitButton>
				</StyledLoginForm>
			</DynamicWrapper>
		</>
	);
}
