import create from 'zustand';
import {persist} from 'zustand/middleware';

const useMyStore = create(
	persist(
		set => ({
			companyInfo: [],
			addCompanyInfo: client => {
				set(() => {
					return {companyInfo: [client]};
				});
			},
		}),
		{
			name: 'myCompany', // unique name
			getStorage: () => localStorage,
		}
	)
);

export default useMyStore;
