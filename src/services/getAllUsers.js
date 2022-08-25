import {dbConnect} from '../../backend/dbConnect';
import User from '../../backend/model';

export async function getAlluser() {
	await dbConnect();
	const users = await User.find();
	return users.map(({username, password}) => {
		return {username, password};
	});
}
