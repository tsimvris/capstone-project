import dynamic from 'next/dynamic';
import Layout from '../components/Layout';

export default function Homepage() {
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
