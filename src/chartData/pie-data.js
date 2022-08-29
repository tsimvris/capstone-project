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
const colors = [{color: 'red'}, {color: 'blue'}, {color: 'green'}];
export const pieData = {
	labels: mock.map(item => item.month),
	datasets: [
		{
			label: 'Dataset 1',
			data: mock.map(month => month.income),
			backgroundColor: colors.map(item => item.color),
		},
	],
};
export const config = {
	type: 'pie',
	data: pieData,
	options: {
		responsive: true,
		plugins: {
			legend: {
				position: 'top',
			},
			title: {
				display: true,
				text: 'Pie Test',
			},
		},
	},
};
