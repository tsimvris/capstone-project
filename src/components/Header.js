import {Drawer} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import {useState} from 'react';
import {BsFillPeopleFill} from 'react-icons/bs';
import * as FaIcons from 'react-icons/fa';
import {ImHome} from 'react-icons/im';
import {MdHomeRepairService} from 'react-icons/md';

import StyledLink from '../components/menu/StyledLink';

import StyledMenuBox from './menu/styledMenuBox';
import StyledNavBar from './menu/styledNavBar';
import StyledNavBarButton from './menu/styledNavBarButton';
import StyledSpan from './menu/StyledSpan';
export default function Header() {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	return (
		<header>
			<StyledNavBar>
				<StyledNavBarButton
					onClick={() => {
						setIsDrawerOpen(true);
					}}
				>
					<FaIcons.FaBars />
				</StyledNavBarButton>

				<Drawer
					PaperProps={{
						sx: {
							backgroundColor: 'transparent',
						},
					}}
					anchor="left"
					open={isDrawerOpen}
					onClose={() => {
						setIsDrawerOpen(false);
					}}
				>
					<StyledMenuBox>
						<Image width="130px" height="129" src="/Dashy.svg" alt="logo" />
						<Link href="/">
							<StyledLink>
								<ImHome />
								<StyledSpan>Home</StyledSpan>
							</StyledLink>
						</Link>
						<Link href="/clients/clients">
							<StyledLink>
								<BsFillPeopleFill />
								<StyledSpan>Clients</StyledSpan>
							</StyledLink>
						</Link>
						<Link href="/services/services">
							<StyledLink>
								<MdHomeRepairService />
								<StyledSpan>Services</StyledSpan>
							</StyledLink>
						</Link>
					</StyledMenuBox>
				</Drawer>
			</StyledNavBar>
		</header>
	);
}
