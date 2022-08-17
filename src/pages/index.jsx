import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';

import Layout from '../components/Layout';
import StyledButton from '../components/styledButton';
export default function Homepage() {
	const router = useRouter();
	const DynamicWrapper = dynamic(
		() => import('../components/Forms/StyledComponents/styledFormWrapper'),
		{
			ssr: false,
		}
	);
	return (
		<Layout>
			<DynamicWrapper>
				
			</DynamicWrapper>
		</Layout>
	);
}
