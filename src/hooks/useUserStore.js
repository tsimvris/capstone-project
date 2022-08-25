import create from 'zustand';
import {persist} from 'zustand/middleware';

const useUserStore = create(
	persist(
		set => ({
			logedInUser: {},

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
