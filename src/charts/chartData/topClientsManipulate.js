import useClientStore from '../../hooks/useClientStore';
let clientsWithInvoices = [];

export const FindClientsWithInvoices = () => {
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
	const topClients = clients.sort(function (a, b) {
		return b.income - a.income;
	});
	return topClients;
};
