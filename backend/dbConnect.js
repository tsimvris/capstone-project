import mongoose from 'mongoose';

const {MONGODB_URL} = process.env;

export const dbConnect = async () => {
	try {
		await mongoose.connect(MONGODB_URL);
		console.log('MongoDB Connected');
	} catch (error) {
		console.log(error.message);
	}
};
