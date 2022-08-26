import Head from 'next/head';
import {useCallback, useState} from 'react';
import {ComposedChart, Line, Bar, XAxis, YAxis, Tooltip, Legend} from 'recharts';
import {PieChart, Pie, Sector} from 'recharts';

import StyledHeadlineWrapper from '../components/dashboard/StyledHeadlineWrapper';
import Layout from '../components/Layout';
import StyledLoginSpan from '../components/login/StyledLoginSpan';
import useUserStore from '../hooks/useUserStore';

const data = [
	{name: 'Kunde A', value: 2400},
	{name: 'Kunde B', value: 1300},
	{name: 'Kunde C', value: 2300},
	{name: 'Kunde D', value: 1200},
	{name: 'Kunde E', value: 1200},
];

const renderActiveShape = props => {
	const RADIAN = Math.PI / 180;
	const {cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, value} =
		props;
	const sin = Math.sin(-RADIAN * midAngle);
	const cos = Math.cos(-RADIAN * midAngle);
	const sx = cx + (outerRadius + 10) * cos;
	const sy = cy + (outerRadius + 10) * sin;
	const mx = cx + (outerRadius + 30) * cos;
	const my = cy + (outerRadius + 30) * sin;
	const ex = mx + (cos >= 0 ? 1 : -1) * 22;
	const ey = my;
	const textAnchor = cos >= 0 ? 'start' : 'end';

	return (
		<g>
			<text x={cx} y={cy} dy={8} textAnchor="middle" fill="#fc5130">
				{payload.name}
			</text>
			<Sector
				cx={cx}
				cy={cy}
				innerRadius={innerRadius}
				outerRadius={outerRadius}
				startAngle={startAngle}
				endAngle={endAngle}
				fill={fill}
			/>
			<Sector
				cx={cx}
				cy={cy}
				startAngle={startAngle}
				endAngle={endAngle}
				innerRadius={outerRadius + 6}
				outerRadius={outerRadius + 10}
				fill="#fc5130"
			/>
			<path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke="#fc5130" fill="none" />
			<circle cx={ex} cy={ey} r={2} fill="#fc5130" stroke="fc5130" />
			<text
				x={ex + (cos >= 0 ? 1 : -1) * 12}
				y={ey}
				textAnchor={textAnchor}
				fill="#fc5130"
			>{`${value}€`}</text>
		</g>
	);
};

export default function HomePage() {
	const logedInUser = useUserStore(state => state.logedInUser);
	const [activeIndex, setActiveIndex] = useState(0);
	const onPieEnter = useCallback(
		(_, index) => {
			setActiveIndex(index);
		},
		[setActiveIndex]
	);
	return (
		<Layout>
			<Head>
				<title key="title">Dashy</title>
				<meta key="description" name="description" content="This is my Capstone project" />
				<link rel="icon" href="/Dashy.webp" />
			</Head>
			{logedInUser ? (
				<>
					<StyledHeadlineWrapper>
						<h1>
							Welcome back <StyledLoginSpan> {logedInUser?.username}</StyledLoginSpan>
						</h1>
					</StyledHeadlineWrapper>
					<br />
					<StyledHeadlineWrapper>
						<StyledHeadlineWrapper>
							<h2>Quartal Analyse</h2>
						</StyledHeadlineWrapper>
						<br />
						<ComposedChart
							width={330}
							height={200}
							data={data22}
							margin={{
								top: 20,
								right: 20,
								bottom: 20,
								left: 20,
							}}
						>
							<XAxis dataKey="name" />
							<YAxis />
							<Tooltip />
							<Legend
								width={100}
								wrapperStyle={{
									top: 180,
									width: 320,
									lineHeight: '10px',
								}}
							/>

							<Bar dataKey="Umsatz*1000 €" barSize={20} fill="#413ea0" />
							<Line type="monotone" dataKey="Rechnungen" stroke="#fc5130" />
						</ComposedChart>
						<br />
						<br />

						<h2>Top 5 Clients</h2>
					</StyledHeadlineWrapper>
					<PieChart width={375} height={400}>
						<Pie
							activeIndex={activeIndex}
							activeShape={renderActiveShape}
							data={data}
							cx={187}
							cy={150}
							innerRadius={60}
							outerRadius={80}
							fill="#413ea0"
							dataKey="value"
							onMouseEnter={onPieEnter}
						/>
					</PieChart>
					<br />
				</>
			) : (
				'You are not logged in'
			)}
		</Layout>
	);
}

const data22 = [
	{
		name: 'August',
		Rechnungen: 10,
		'Umsatz*1000 €': `12.5`,
	},
	{
		name: 'September',
		Rechnungen: 14,
		'Umsatz*1000 €': `8.5`,
	},
	{
		name: 'Oktober',
		Rechnungen: 12,
		'Umsatz*1000 €': `9.5`,
	},
];
