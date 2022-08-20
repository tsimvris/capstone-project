import {createGlobalStyle} from 'styled-components';

export const GlobalStyle = createGlobalStyle`
	*,
	*::before,
	*::after {
		box-sizing: border-box;
	}
:root{
	--primary: #ecf0f3;
	--secondary: #fc5130;
	--primary-font: #555;
	--submit: #15e38a;
	--delete:#ED2939;
}
	html {
		font-size: 16px;
	}

	body {
		margin: 0;
		background-color:var(--primary) ;
		color:var(--primary-font);
		font-family:"Poppins", sans-serif;
		font-size: 1rem;
		letter-spacing:1.2px;
	}
`;
