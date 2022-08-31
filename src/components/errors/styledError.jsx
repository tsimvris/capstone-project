import styled from 'styled-components';

const StyledError = styled.p`
	height: 40px;
	color: var(--delete);
	font-size: 10px;
	text-align: center;
	overflow-wrap: break-word;
	::after {
		content: '⤴';
	}
`;

export default StyledError;
