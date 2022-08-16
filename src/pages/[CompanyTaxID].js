import {useRouter} from 'next/router';

import StyledForm from '../components/Forms/StyledComponents/styledForm';
import StyledInput from '../components/Forms/StyledComponents/styledInput';
import StyledSubmitButton from '../components/Forms/StyledComponents/styledSubmitButton';
import StyledWrapper from '../components/styledClientWrapper';
import useClientStore from '../hooks/useClientStore';

export default function EditClient() {
	const router = useRouter();
	const ref = router.query;
	const allClients = useClientStore(state => state.clients);
	const ClientsArray = allClients.filter(ele => {
		return ele.CompanyTaxID === ref.CompanyTaxID;
	});
	const wantedClient = ClientsArray[0];
	return (
		<StyledWrapper>
			<StyledForm>
				<StyledInput defaultValue={wantedClient?.CompanyName} />
				<StyledInput defaultValue={wantedClient?.CompanyAdress} />
				<StyledInput defaultValue={wantedClient?.CompanyZipCode} />
				<StyledInput defaultValue={wantedClient?.CompanyCity} />
				<StyledInput defaultValue={wantedClient?.CompanyTaxID} />
				<StyledSubmitButton>Save</StyledSubmitButton>
			</StyledForm>
		</StyledWrapper>
	);
}
