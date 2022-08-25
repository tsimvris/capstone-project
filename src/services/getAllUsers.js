import {dbConnect} from '../../backend/dbConnect';
import User from '../../backend/model';

export async function getAlluser() {
	await dbConnect();
	const users = await User.find();
	return users.map(({id, username, password, isLoggedIn}) => {
		return {id, username, password, isLoggedIn};
	});
}
export async function getUserById(id_) {
	await dbConnect();
	const user = await User.findById(id_);
	const {id, username, password, isLoggedIn} = user;
	return {id, username, password, isLoggedIn};
}
