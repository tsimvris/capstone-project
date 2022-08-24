import styled from 'styled-components';

const StyledSignupCheckbox = styled.input`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	appearance: none;
	width: 80px;
	height: 50px;
	padding: 10px;
	border: 5px solid var(--primary);
	border-radius: 10px;
	outline: none;
	box-shadow: -10px -10px 15px rgba(255, 255, 255, 0.55), 10px 10px 15px rgba(0, 0, 0, 0.12);
	color: #999;
	::after {
		content: 'YES';
	}
	:checked {
		box-shadow: -10px -10px 15px rgba(255, 255, 255, 0.55),
			10px 10px 15px rgba(70, 70, 70, 0.12), inset -10px -10px 15px rgba(255, 255, 255, 0.55),
			inset 10px 10px 15px rgba(70, 70, 70, 0.12);
	}
	:checked::after {
		color: var(--submit);
	}
`;

export default StyledSignupCheckbox;
