import styled from 'styled-components';

const StyledLi = styled.li`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 350px;
	height: 50px;
	margin: 10px 5px;
	border-radius: 15px;
	background-color: #fc814a;
	color: #19647e;
	font-size: 20px;
	font-weight: 600;
	&::first-letter {
		color: #f9f6ee;
	}
`;

export default StyledLi;
