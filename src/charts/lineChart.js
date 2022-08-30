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

import useClientStore from '../hooks/useClientStore';
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
	const invoices = useClientStore(state => state.invoices);
	invoices.sort(function (a, b) {
		return b.invoiceTotal - a.invoiceTotal;
	});
	let topInvoices = [];
	for (let i = 0; i < 5; i++) {
		if (invoices[i]?.invoiceTotal > 0) {
			topInvoices.push(invoices[i]);
		}
	}

	topInvoices.sort(function (a, b) {
		return a.invoiceTotal - b.invoiceTotal;
	});
	let formedData = [];
	topInvoices.map(invoice => {
		let invoiceObj = {
			clientName: invoice.invoiceClient,
			invoiceTotal: invoice.invoiceTotal,
			invoiceTaxes: invoice.invoiceTaxes,
			invoicePricePerHour: invoice.invoicePriceHour,
			workedHours: invoice.invoiceWorkedHours,
		};

		formedData.push(invoiceObj);
	});
	const barData = {
		labels: formedData.map(item => item.clientName),
		datasets: [
			{
				type: 'line',
				label: 'Invoice Taxes',
				data: formedData.map(item => item.invoiceTaxes),
				backgroundColor: '#764ba2',
				borderColor: '#764ba2',
				borderWidth: 3,
				pointRadius: 2.3,
				tension: 0.4,
				yAxisID: 'y1',
			},
			{
				type: 'line',
				label: 'Invoice Price Per Hour',
				data: formedData.map(item => item.invoicePricePerHour),
				backgroundColor: '#34E5FF',
				borderColor: '#34E5FF',
				borderWidth: 3,
				pointRadius: 2.3,
				tension: 0.4,
				yAxisID: 'y1',
			},
			{
				type: 'line',
				label: 'Worked Hours',
				data: formedData.map(item => item.workedHours),
				backgroundColor: '#FFCE56',
				borderColor: '#FFCE56',
				borderWidth: 3,
				pointRadius: 2.3,
				tension: 0.5,
				yAxisID: 'y1',
			},

			{
				type: 'bar',
				label: 'Invoice Total',
				data: formedData.map(item => item.invoiceTotal),
				backgroundColor: '#fc5130',
				yAxisID: 'y',
			},
		],
	};
	const options = {
		maintainAspectRatio: true,
		stacked: true,
		plugins: {
			tooltip: {
				enabled: true,
			},
			legend: {
				position: 'bottom',
				labels: {
					boxWidth: 30,
					boxHeight: 10,
					usePointStyle: true,
					pointStyle: 'rectRounded',
				},
			},
		},
		scales: {
			x: {
				ticks: {
					font: {
						size: 10,
					},
				},
			},
			y: {
				type: 'linear',
				display: true,

				position: 'left',
				ticks: {
					font: {
						size: 10,
					},
				},
			},
			y1: {
				grid: {
					drawOnChartArea: false,
				},
				type: 'linear',

				display: true,
				position: 'right',
				ticks: {
					font: {
						size: 10,
					},
				},
			},
		},
	};
	return (
		<StyledChartDiv>
			{formedData.length > 1 ? (
				<Line data={barData} options={options} />
			) : (
				'No data to be shown'
			)}
		</StyledChartDiv>
	);
}
