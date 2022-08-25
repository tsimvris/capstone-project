import {dbConnect} from '../../../backend/dbConnect';
import User from '../../../backend/model';

export default async function postHandler(req, res) {
	await dbConnect();

	if (req.method === 'POST') {
		const data = JSON.parse(req.body);
		await User.create(data);
		res.status(200).json({message: 'User created'});
	}
}
