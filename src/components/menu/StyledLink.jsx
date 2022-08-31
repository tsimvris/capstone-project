import styled, {css} from 'styled-components';

const StyledLink = styled.a`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 130px;
	height: 55px;
	margin-bottom: 42px;
	border: none;
	border-radius: 25px;
	background-color: var(--secondary);
	color: var(--primary);
	${({variant = 'logout'}) =>
		variant === 'logout' &&
		css`
			background-color: transparent;
			color: var(--delete);
			&:hover {
				background-color: var(--delete);
				color: white;
			}
		`}
`;

export default StyledLink;
