import styled from 'styled-components';

const StyledError = styled.p`
	height: 20px;
	margin-top: -5px;
	color: var(--delete);
	font-size: 10px;
	text-align: center;
	::after {
		content: '⤴';
	}
`;

export default StyledError;
