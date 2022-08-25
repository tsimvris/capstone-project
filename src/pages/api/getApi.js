import {dbConnect} from '../../../backend/dbConnect';
import {getUserById} from '../../services/findUserById';

export default async function getHandler(req, res) {
	const {id} = req.query;
	await dbConnect();
	if (req.method === 'GET') {
		const user = getUserById(id);
		res.status(200).json(user);
	}
}
