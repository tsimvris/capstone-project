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
				<StyledButton
					onClick={() => {
						router.push({
							pathname: '/clients',
						});
					}}
				>
					Clients
				</StyledButton>
				<StyledButton
					onClick={() => {
						router.push({
							pathname: '/services',
						});
					}}
				>
					Services
				</StyledButton>
			</DynamicWrapper>
		</Layout>
	);
}
