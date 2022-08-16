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
			editClient: EditedClient => {
				set(state => {
					return {clients: [...state.clients, EditedClient]};
				});
			},
		}),
		{
			name: 'Clients', // unique name
			getStorage: () => localStorage, // (optional) by default, 'localStorage' is used
		}
	)
);

export default useClientStore;
