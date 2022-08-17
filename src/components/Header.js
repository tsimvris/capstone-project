import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

import StyledNavBar from './menu/styledNavBar';
import StyledNavBarButton from './menu/styledNavBarButton';

export default function Header() {
	return (
		<header>
			<StyledNavBar>
				<StyledNavBarButton>
					<MenuOutlinedIcon />
				</StyledNavBarButton>
			</StyledNavBar>
		</header>
	);
}
