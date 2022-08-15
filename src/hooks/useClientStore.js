import create from 'zustand';
import {persist} from 'zustand/middleware';

const useClientStore = create(
	persist(set => ({
		clients: [],
		addClient: client => {
			set(state => {
				return {clients: [...state.clients, client]};
			});
		},
		deleteClient: id => {
			set(state => {
				return {
					clients: state.clients.filter(client => client.id !== id),
				};
			});
		},
	}))
);

export default useClientStore;
