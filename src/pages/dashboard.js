import dynamic from 'next/dynamic';
import Head from 'next/head';
import {BsEnvelopeOpen} from 'react-icons/bs';
import {FaRegMoneyBillAlt} from 'react-icons/fa';
import {FiUsers} from 'react-icons/fi';

import LineChart from '../chartData/lineChart';
import StyledHeadlineWrapper from '../components/dashboard/StyledHeadlineWrapper';
import StyledInfoBox from '../components/dashboard/StyledInfoBox';
import StyledInfoWrapper from '../components/dashboard/StyledInfoWrapper';
import StyledSpan from '../components/dashboard/StyledSpan';
import Layout from '../components/Layout';
import StyledLoginSpan from '../components/login/StyledLoginSpan';
import useClientStore from '../hooks/useClientStore';
import useUserStore from '../hooks/useUserStore';

export default function HomePage() {
	const logedInUser = useUserStore(state => state.logedInUser);
	const invoices = useClientStore(state => state.invoices);
	const clients = useClientStore(state => state.clients);
	let totalProfit = 0;
	invoices?.map(invoice => {
		totalProfit = totalProfit + invoice.invoiceTotal;
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
							<BsEnvelopeOpen /> Invoices
							<StyledSpan>{invoices?.length}</StyledSpan>
						</StyledInfoBox>
						<StyledInfoBox>
							<FaRegMoneyBillAlt />
							Profit
							<StyledSpan>{totalProfit}€</StyledSpan>
						</StyledInfoBox>
						<StyledInfoBox>
							<FiUsers />
							Clients
							<StyledSpan>{clients?.length}</StyledSpan>
						</StyledInfoBox>
					</StyledInfoWrapper>

					<StyledHeadlineWrapper>
						<StyledHeadlineWrapper>
							<h2>Quartal Analyse</h2>
						</StyledHeadlineWrapper>
						<LineChart />

						<h2>Top 5 Clients</h2>
					</StyledHeadlineWrapper>
				</DynamicWrapper>
			) : (
				'You are not logged in'
			)}
		</Layout>
	);
}
