import create from 'zustand';
import {persist} from 'zustand/middleware';

const useUserStore = create(
	persist(
		set => ({
			registeredUsers: [],
			logedInUser: {},
			signupUser: user => {
				set(state => {
					return {registeredUsers: [...state.registeredUsers, user]};
				});
			},
			setLogedinUser: user => {
				set(() => {
					return {logedInUser: user};
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
