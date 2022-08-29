const mock = [
	{
		month: 'Aug.',
		income: 5750,
		invoices: 12,
	},

	{
		month: 'Sept.',
		income: 4750,
		invoices: 9,
	},

	{
		month: 'Okt.',
		income: 6320,
		invoices: 14,
	},
];
const min = Math.min(...mock.map(item => item.invoices)) - 2;

export const barData = {
	labels: mock.map(item => item.month),
	datasets: [
		{
			type: 'line',
			label: 'Invoices/Month',
			data: mock.map(month => month.invoices),
			backgroundColor: '#764ba2',
			borderColor: '#764ba2',
			borderWidth: 3,
			pointRadius: 2.3,
			tension: 0.4,
			yAxisID: 'y1',
		},
		{
			type: 'bar',
			label: 'Income/Month',
			data: mock.map(month => month.income),
			backgroundColor: '#fc5130',
			tension: 0.4,
			yAxisID: 'y',
		},
	],
};

export const options = {
	maintainAspectRatio: true,
	stacked: true,
	plugins: {
		tooltip: {
			enabled: true,
		},
		legend: {
			labels: {
				boxWidth: 5,
				boxHeight: 10,
				usePointStyle: true,
				pointStyle: 'rectRounded',
				font: {
					size: 10,
				},
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
			title: {
				display: true,
				align: 'center',
				text: 'Income',
			},
		},
		y1: {
			grid: {
				drawOnChartArea: false,
			},
			type: 'linear',
			min: min,
			display: true,
			position: 'right',
			ticks: {
				font: {
					size: 10,
				},
			},
			title: {
				display: true,
				align: 'center',
				text: 'Invoices',
			},
		},
	},
};
