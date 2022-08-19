import create from 'zustand';
import {persist} from 'zustand/middleware';

const useMyStore = create(
	persist(
		set => ({
			companyInfo: [],
			myLogo: [],
			addCompanyInfo: companyInfo => {
				set(() => {
					return {companyInfo: [companyInfo]};
				});
			},
			addLogo: logo => {
				set(() => {
					return {myLogo: [logo]};
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
