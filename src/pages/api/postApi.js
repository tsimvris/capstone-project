import {dbConnect} from '../../../backend/dbConnect';
import {User} from '../../../backend/model';

export default async function postHandler(req, res) {
	await dbConnect();

	if (req.method === 'POST') {
		try {
			const daten = JSON.parse(req.body);
			await User.create(daten);
			res.status(200).json({message: 'User created'});
		} catch (error) {
			console.error(`There is an error: ${error}`);
		}
	}
}
