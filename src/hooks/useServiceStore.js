import create from 'zustand';
import {persist} from 'zustand/middleware';

const useServiceStore = create(
	persist(
		set => ({
			services: [],
			addService: service => {
				set(state => {
					return {services: [...state.services, service]};
				});
			},
			deleteService: id => {
				set(state => {
					return {services: state.services.filter(service => service.id !== id)};
				});
			},
		}),
		{
			name: 'Services', // unique name
			getStorage: () => localStorage,
		}
	)
);

export default useServiceStore;
