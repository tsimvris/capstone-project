import mongoose from 'mongoose';

const {Schrema} = mongoose;

const userSchema = new Schrema({
	username: {type: String, required: true},
	password: {type: String, required: true},
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
