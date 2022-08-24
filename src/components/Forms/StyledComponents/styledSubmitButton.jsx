import styled, {css} from 'styled-components';

const StyledSubmitButton = styled.button`
	width: 238px;
	height: 47px;
	margin: 10px auto;
	border: none;
	border-radius: 13px;
	outline: none;
	background-color: var(--secondary);
	box-shadow: 3px 3px 8px #b1b1b1, -3px -3px 8px #fff;
	color: var(--primary);
	font-size: 24px;
	font-weight: 700;
	text-decoration: none;
	cursor: pointer;
	:hover {
		background-color: var(--submit);
	}
	a {
		color: white;
		font-size: 18px;
		text-decoration: none;
	}

	${({variant = 'login'}) =>
		variant === 'login' &&
		css`
			background-color: #1a73e8;
			color: white;
			&:hover {
				background-color: transparent;
				color: #1a73e8;
			}
		`}
`;

export default StyledSubmitButton;
