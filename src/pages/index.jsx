import {ErrorMessage} from '@hookform/error-message';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useForm} from 'react-hook-form';

import StyledError from '../components/errors/styledError';
import StyledInput from '../components/Forms/StyledComponents/styledInput';
import StyledLabel from '../components/Forms/StyledComponents/styledLabel';
import StyledSubmitButton from '../components/Forms/StyledComponents/styledSubmitButton';
import StyledLoginForm from '../components/login/styledLoginForm';
import StyledSignupLink from '../components/login/StyledSignupLink';
import StyledSpan from '../components/menu/StyledSpan';
import useMyStore from '../hooks/useMyStore';
import useUserStore from '../hooks/useUserStore';
export default function Homepage() {
	const registeredUsers = useUserStore(state => state.registeredUsers);
	const setLogedinUser = useUserStore(state => state.setLogedinUser);
	const DynamicWrapper = dynamic(() => import('../components/login/styledLoginWrapper'), {
		ssr: false,
	});
	const addLogo = useMyStore(state => state.addLogo);
	const myLogo = useMyStore(state => state.myLogo);
	const router = useRouter();
	const defaultLogo = '/defaultLogo.svg';
	if (myLogo.length === 0) {
		addLogo(defaultLogo);
	}
	const {
		register,
		formState: {errors},
		handleSubmit,
	} = useForm({
		criteriaMode: 'all',
	});
	const onSubmit = data => {
		const loginUser = {
			username: data.username,
			password: data.password,
		};
		const match = registeredUsers.filter(registeredUser => {
			return (
				registeredUser.username === loginUser.username &&
				registeredUser.password === loginUser.password
			);
		});
		if (match.length === 1) {
			setLogedinUser(loginUser);
			router.push('/dashboard');
		} else {
			alert('The username or password you entered is incorrect');
		}
	};

	return (
		<>
			<Head>
				<title key="title">Dashy Login</title>
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
					<h2>Welcome to Dashy</h2>
					<StyledLabel>
						Username
						<StyledInput
							placeholder="username"
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
					<StyledSubmitButton variant="login" type="submit">
						Login
					</StyledSubmitButton>

					<p>Not a member?</p>
					<Link href="/signup">
						<StyledSignupLink>
							<StyledSpan>Signup Now</StyledSpan>
						</StyledSignupLink>
					</Link>
				</StyledLoginForm>
			</DynamicWrapper>
		</>
	);
}
