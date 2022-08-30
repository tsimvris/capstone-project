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

export default function PieChart() {
	let clientsWithInvoices = [];
	const invoices = useClientStore(state => state.invoices);
	const clients = useClientStore(state => state.clients);
	invoices.forEach(invoice => {
		let sortedClient = clients.find(client => client.CompanyName === invoice.invoiceClient);

		if (clientsWithInvoices.includes(sortedClient)) {
			console.log('Client already in array');
		} else {
			clientsWithInvoices.push(sortedClient);
		}
	});
	clientsWithInvoices.forEach(client => {
		const ClientInvoiceTotals = invoices
			.filter(invoice => invoice.invoiceClient === client.CompanyName)
			.map(invoice => invoice.invoiceTotal);
		client.income = ClientInvoiceTotals.reduce((a, b) => a + b, 0);
	});

	let sortedClients = clients.sort(function (a, b) {
		return b.income - a.income;
	});
	let topClients = [];
	for (let i = 0; i < 5; i++) {
		if (sortedClients[i]?.income > 0) {
			topClients.push(sortedClients[i]);
		}
	}
	let formedData = [];
	topClients.map(client => {
		let clientObj = {client: client.CompanyName, income: client.income};
		formedData.push(clientObj);
	});
	const colors = [
		{color: '#fc5130'},
		{color: '#764ba2'},
		{color: '#9EE493'},
		{color: '#FFCE56'},
		{color: '#34E5FF'},
	];
	const pieData = {
		labels: formedData.map(item => item.client),
		datasets: [
			{
				label: 'Kundenumsatz',
				data: formedData.map(month => month.income),
				backgroundColor: colors.map(item => item.color),
			},
		],
	};
	const options = {
		type: 'pie',
		data: pieData,
		options: {
			responsive: true,
		},
		plugins: {
			tooltip: {
				enabled: true,
			},
			legend: {
				position: 'top',
				labels: {
					boxWidth: 30,
					boxHeight: 10,
					usePointStyle: true,
					pointStyle: 'rectRounded',
				},
			},
		},
	};
	return (
		<StyledChartDiv>
			{topClients.length > 2 ? (
				<Pie data={pieData} options={options} />
			) : (
				'No data to be shown'
			)}
		</StyledChartDiv>
	);
}
