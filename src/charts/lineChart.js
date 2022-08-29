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
import styled from 'styled-components';

import {options} from './chartData/bar-data';
import {barData} from './chartData/bar-data';

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

export default function LineChart() {
	return (
		<StyledChartDiv>
			<Line data={barData} options={options} />
		</StyledChartDiv>
	);
}
