import {Drawer} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useState} from 'react';
import {BsFillPeopleFill} from 'react-icons/bs';
import {CgProfile} from 'react-icons/cg';
import * as FaIcons from 'react-icons/fa';
import {ImHome} from 'react-icons/im';
import {MdHomeRepairService} from 'react-icons/md';
import {RiMoneyEuroCircleFill} from 'react-icons/ri';

import StyledLink from '../components/menu/StyledLink';
import useMyStore from '../hooks/useMyStore';

import StyledImageContainer from './menu/StyledImageContainer';
import StyledMenuBox from './menu/styledMenuBox';
import StyledNavBar from './menu/styledNavBar';
import StyledNavBarButton from './menu/styledNavBarButton';
import StyledSpan from './menu/StyledSpan';
export default function Header() {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const myLogo = useMyStore(state => state.myLogo);
	const router = useRouter();
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
				<StyledImageContainer
					onClick={() => {
						router.push({
							pathname: '/profile',
						});
					}}
				>
					<Image
						src={myLogo[0]}
						alt="Company Logo"
						height="40px"
						width="40px"
						style={{borderRadius: '50%'}}
					/>
				</StyledImageContainer>

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
						<Image width="130px" height="130px" src="/Dashy.svg" alt="logo" />
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
						<Link href="/invoice">
							<StyledLink>
								<RiMoneyEuroCircleFill />
								<StyledSpan>Invoices</StyledSpan>
							</StyledLink>
						</Link>
						<Link href="/profile">
							<StyledLink>
								<CgProfile />
								<StyledSpan>Profile</StyledSpan>
							</StyledLink>
						</Link>
					</StyledMenuBox>
				</Drawer>
			</StyledNavBar>
		</header>
	);
}
