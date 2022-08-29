const mock = [
	{
		client: 'Kunde A',
		income: 5750,
		invoices: 12,
	},

	{
		client: 'Kunde B',
		income: 4750,
		invoices: 9,
	},

	{
		client: 'Kunde C',
		income: 6320,
		invoices: 14,
	},
	{
		client: 'Kunde D',
		income: 6320,
		invoices: 14,
	},
	{
		client: 'Kunde E',
		income: 6320,
		invoices: 14,
	},
];
const colors = [
	{color: '#fc5130'},
	{color: '#764ba2'},
	{color: '#9EE493'},
	{color: '#FFCE56'},
	{color: '#34E5FF'},
];
export const pieData = {
	labels: mock.map(item => item.client),
	datasets: [
		{
			label: 'Dataset 1',
			data: mock.map(month => month.income),
			backgroundColor: colors.map(item => item.color),
		},
	],
};
export const options = {
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
