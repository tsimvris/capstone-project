import styled from 'styled-components';

const StyledSearchField = styled.input`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 235px;
	padding: 10px;
	border: none;
	border-radius: 10px;
	outline: none;
	background-color: transparent;
	box-shadow: inset 5px 5px 8px #cbced1, inset -5px -5px 8px #fff;
	font-size: 1rem;
	::placeholder {
		color: #999;
		text-align: center;
	}
`;

export default StyledSearchField;
