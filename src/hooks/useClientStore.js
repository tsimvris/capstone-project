import create from 'zustand';
import {persist} from 'zustand/middleware';

const useClientStore = create(
	persist(
		set => ({
			clients: [],
			addClient: client => {
				set(state => {
					return {clients: [...state.clients, client]};
				});
			},
			invoices: [],
			addInvoice: invoice => {
				set(state => {
					return {invoices: [...state.invoices, invoice]};
				});
			},
		}),

		{
			name: 'Clients', // unique name
			getStorage: () => localStorage,
		}
	)
);

export default useClientStore;
