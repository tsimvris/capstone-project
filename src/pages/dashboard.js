import dynamic from 'next/dynamic';
import Head from 'next/head';
import {BsEnvelopeOpen} from 'react-icons/bs';
import {FaRegMoneyBillAlt} from 'react-icons/fa';
import {FiUsers} from 'react-icons/fi';
import {MdMiscellaneousServices} from 'react-icons/md';

import LineChart from '../charts/lineChart';
import PieChart from '../charts/pieChart';
import StyledHeadlineWrapper from '../components/dashboard/StyledHeadlineWrapper';
import StyledInfoBox from '../components/dashboard/StyledInfoBox';
import StyledInfoWrapper from '../components/dashboard/StyledInfoWrapper';
import StyledSpan from '../components/dashboard/StyledSpan';
import Layout from '../components/Layout';
import StyledLoginSpan from '../components/login/StyledLoginSpan';
import useClientStore from '../hooks/useClientStore';
import useServiceStore from '../hooks/useServiceStore';
import useUserStore from '../hooks/useUserStore';

export default function HomePage() {
	const logedInUser = useUserStore(state => state.logedInUser);
	const invoices = useClientStore(state => state.invoices);
	const clients = useClientStore(state => state.clients);
	const services = useServiceStore(state => state.services);
	let totalProfit = 0;
	invoices?.map(invoice => {
		totalProfit = totalProfit + invoice.invoiceSubtotal;
	});
	const DynamicWrapper = dynamic(() => import('../components/dashboard/StyledDashboardWrapper'), {
		ssr: false,
	});
	return (
		<Layout>
			<Head>
				<title key="title">Dashy</title>
				<meta key="description" name="description" content="This is my Capstone project" />
				<link rel="icon" href="/Dashy.webp" />
			</Head>
			{logedInUser ? (
				<DynamicWrapper>
					<StyledHeadlineWrapper>
						<h1>
							Welcome back <StyledLoginSpan> {logedInUser?.username}</StyledLoginSpan>
						</h1>
					</StyledHeadlineWrapper>

					<StyledInfoWrapper>
						<StyledInfoBox>
							<FiUsers />
							Clients
							<StyledSpan>{clients?.length}</StyledSpan>
						</StyledInfoBox>
						<StyledInfoBox>
							<MdMiscellaneousServices />
							Services
							<StyledSpan>{services?.length}</StyledSpan>
						</StyledInfoBox>
						<StyledInfoBox>
							<BsEnvelopeOpen /> Invoices
							<StyledSpan>{invoices?.length}</StyledSpan>
						</StyledInfoBox>
						<StyledInfoBox>
							<FaRegMoneyBillAlt />
							Profit
							<StyledSpan>{totalProfit}€</StyledSpan>
						</StyledInfoBox>
					</StyledInfoWrapper>

					<StyledHeadlineWrapper>
						<StyledHeadlineWrapper>
							<h2>Biggest Invoices</h2>
						</StyledHeadlineWrapper>
						<LineChart />

						<h2>Top Clients</h2>
						<PieChart />
					</StyledHeadlineWrapper>
				</DynamicWrapper>
			) : (
				'You are not logged in'
			)}
		</Layout>
	);
}
