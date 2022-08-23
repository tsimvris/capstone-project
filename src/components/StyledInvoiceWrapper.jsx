import styled from 'styled-components';

const StyledInvoiceWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
	max-width: 100vw;
	min-height: 100vh;
	padding: 0;
	background-color: var(--primary);

	@media print {
		a {
			display: none;
		}
		button {
			display: none;
		}
	}
`;

export default StyledInvoiceWrapper;
