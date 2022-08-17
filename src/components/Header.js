import * as FaIcons from 'react-icons/fa';

import StyledNavBar from './menu/styledNavBar';
import StyledNavBarButton from './menu/styledNavBarButton';

export default function Header() {
	return (
		<header>
			<StyledNavBar>
				<StyledNavBarButton>
					<FaIcons.FaBars />
				</StyledNavBarButton>
			</StyledNavBar>
		</header>
	);
}
