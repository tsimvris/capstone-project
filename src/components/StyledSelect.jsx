import styled from 'styled-components';
const StyledSelect = styled.select`
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
	option {
		display: flex;
		min-height: 20px;
		white-space: pre-line;
	}
`;
export default StyledSelect;
