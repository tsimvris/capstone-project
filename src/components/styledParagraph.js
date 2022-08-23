import styled from 'styled-components';

const StyledParagraph = styled.p`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
	width: 320px;
	gap: 15px;
	margin: -15px 0;
	padding: 20px;
	border-radius: 25px;
	box-shadow: 10px 10px 20px #cbced1, -10px -10px 20px #fff;
	color: var(--secondary);
	font-size: 20px;
`;

export default StyledParagraph;
