import {dbConnect} from '../../backend/dbConnect';
import User from '../../backend/model';
export async function getUserById(id_) {
	await dbConnect();
	const user = await User.findById(id_);
	const {id, username, password, isLoggedIn} = user;
	return {id, username, password, isLoggedIn};
}
