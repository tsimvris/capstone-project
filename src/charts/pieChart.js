import {
	Chart as ChartJS,
	BarElement,
	CategoryScale,
	TimeScale,
	LinearScale,
	PointElement,
	LineElement,
	ArcElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import {Pie} from 'react-chartjs-2';
import styled from 'styled-components';

import {pieData} from './chartData/pie-data';
import {options} from './chartData/pie-data';
import FindClientsWithInvoices from './chartData/topClientsManipulate';
ChartJS.register(
	CategoryScale,
	BarElement,
	TimeScale,
	ArcElement,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

const StyledChartDiv = styled.div`
	height: auto;
	margin: 24px 8px 48px 8px;
`;

export default function PieChart() {
	return (
		<StyledChartDiv>
			<FindClientsWithInvoices />;
			<Pie data={pieData} options={options} />
		</StyledChartDiv>
	);
}
