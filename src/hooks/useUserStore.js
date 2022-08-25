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
			fetchedUsers: {results: []},
			fetchUsers: async url => {
				try {
					const response = await fetch(url);
					const data = await response.json();
					set({fetchedUsers: data});
				} catch (error) {
					console.error(`There is an error: ${error}`);
				}
			},
		}),
		{
			name: 'Users',
			getStorage: () => localStorage,
		}
	)
);

export default useUserStore;
