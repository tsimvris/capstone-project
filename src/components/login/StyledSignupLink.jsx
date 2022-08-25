import styled from 'styled-components';

const StyledSignupLink = styled.a`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 130px;
	height: 55px;
	margin-bottom: 42px;
	border: none;
	border-radius: 25px;
	background-color: transparent;
	box-shadow: 3px 3px 8px #b1b1b1, -3px -3px 8px #fff;
	color: #1a73e8;

	&:hover {
		background-color: #1a73e8;
		color: white;
	}
`;

export default StyledSignupLink;
