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
import {Line} from 'react-chartjs-2';
import {Pie} from 'react-chartjs-2';
import styled from 'styled-components';

import {options} from './mock-data';
import {barData} from './mock-data';
import {pieData} from './pie-data';
import {config} from './pie-data';
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
	margin: 24px 12px;
	padding: 5px;
`;

export default function LineChart() {
	return (
		<StyledChartDiv>
			<Line data={barData} options={options} />
			<Pie data={pieData} options={config} />
		</StyledChartDiv>
	);
}
