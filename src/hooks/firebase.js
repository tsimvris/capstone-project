import {initializeApp} from 'firebase/app';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyCkAQPF8gjPn-t8zPeut_8Bq_YJFS_LfUA',
	authDomain: 'capstone-2f44d.firebaseapp.com',
	projectId: 'capstone-2f44d',
	storageBucket: 'capstone-2f44d.appspot.com',
	messagingSenderId: '506213944386',
	appId: '1:506213944386:web:9f1ffe5ef274aebd10f1db',
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
