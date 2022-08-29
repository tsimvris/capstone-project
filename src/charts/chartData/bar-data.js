const mock = [
	{
		month: 'Aug.',
		income: 5839,
		invoices: 12,
	},

	{
		month: 'Sept.',
		income: 4364,
		invoices: 9,
	},

	{
		month: 'Okt.',
		income: 6843,
		invoices: 14,
	},
];

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
			tension: 0.5,
			yAxisID: 'y1',
		},
		{
			type: 'bar',
			label: 'Income/Month',
			data: mock.map(month => month.income),
			backgroundColor: '#fc5130',
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
			min: 0,
			max: Math.ceil(Math.max(...mock.map(item => item.income)) / 1000) * 1000 + 1000,
			position: 'left',
			ticks: {
				font: {
					size: 10,
				},
			},
			title: {
				display: true,
				align: 'center',
				text: '',
			},
		},
		y1: {
			grid: {
				drawOnChartArea: false,
			},
			type: 'linear',
			min: Math.min(...mock.map(item => item.invoices)) - 2,
			max: Math.max(...mock.map(item => item.invoices)) + 2,

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
