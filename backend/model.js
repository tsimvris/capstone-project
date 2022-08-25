import mongoose from 'mongoose';

const {Schema} = mongoose;

const userSchema = new Schema({
	id: {type: String, required: true},
	username: {type: String, required: true},
	password: {type: String, required: true},
	isLoggedIn: {type: Boolean, required: true},
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
