import create from 'zustand';
import {persist} from 'zustand/middleware';

const useServiceStore = create(
	persist(
		set => ({
			services: [],
			addService: service => {
				set(state => {
					return {clients: [...state.services, service]};
				});
			},
		}),
		{
			name: 'Services', // unique name
			getStorage: () => localStorage, // (optional) by default, 'localStorage' is used
		}
	)
);

export default useServiceStore;
