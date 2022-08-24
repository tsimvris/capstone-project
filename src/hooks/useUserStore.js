import create from 'zustand';
import {persist} from 'zustand/middleware';

const useUserStore = create(
	persist(
		set => ({
			users: [],
			addUser: user => {
				set(state => {
					return {users: [...state.users, user]};
				});
			},
		}),
		{
			name: 'Users',
			getStorage: () => localStorage,
		}
	)
);

export default useUserStore;
