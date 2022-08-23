import {ErrorMessage} from '@hookform/error-message';
import {nanoid} from 'nanoid';
import {useRouter} from 'next/router';
import {useForm} from 'react-hook-form';

import useClientStore from '../../hooks/useClientStore';
import useMyStore from '../../hooks/useMyStore';
import useServiceStore from '../../hooks/useServiceStore';
import StyledError from '../errors/styledError';
import StyledFieldset from '../Forms/StyledComponents/StyledFieldset';

import StyledForm from './StyledComponents/styledForm';
import StyledWrapper from './StyledComponents/styledFormWrapper';
import StyledInput from './StyledComponents/styledInput';
import StyledLabel from './StyledComponents/styledLabel';
import StyledRadioInput0 from './StyledComponents/StyledRadioInput0';
import StyledRadioInput19 from './StyledComponents/StyledRadioInput19';
import StyledRadioInput7 from './StyledComponents/StyledRadioInput7';
import StyledSubmitButton from './StyledComponents/styledSubmitButton';
import StyledNotice from './styledNotice';

export default function GenerateInvoiceForm() {
	const clients = useClientStore(state => state.clients);
	const services = useServiceStore(state => state.services);
	const addInvoice = useClientStore(state => state.addInvoice);
	const myCompany = useMyStore(state => state.companyInfo);

	const router = useRouter();
	const {
		register,
		formState: {errors},
		handleSubmit,
	} = useForm({
		criteriaMode: 'all',
	});
	const onSubmit = data => {
		let invoiceModel = {
			id: nanoid(),
			invoiceClient: data.client,
			invoiceService: data.service,
			invoiceWorkedHours: data.workedHours,
			invoicePriceHour: data.priceHour,
			invoiceTaxKey: data.taxKey,
			invoiceSubtotal: data.workedHours * data.priceHour,
			invoiceTaxes: (data.workedHours * data.priceHour * data.taxKey) / 100,
			invoiceTotal:
				(data.workedHours * data.priceHour * data.taxKey) / 100 +
				data.workedHours * data.priceHour,
			invoiceDate: new Date().toLocaleString(),
			invoiceDueDate: twoWeeks.toLocaleString(),
			invoicePaymentDue: 'Payment due within 14 days',
			invoiceBank: myCompany[0].myBank,
			invoiceIban: myCompany[0].myIban,
			invoicePaymentReference: data.client,
		};
		router.push({
			pathname: '/invoice',
		});
		addInvoice(invoiceModel);
	};
	var twoWeeks = new Date();
	twoWeeks.setDate(twoWeeks.getDate() + 14);
	return (
		<StyledWrapper>
			<StyledForm onSubmit={handleSubmit(onSubmit)}>
				<StyledLabel>
					Select a Client
					<StyledInput
						list="clients"
						{...register('client')}
						placeholder="Select a Client"
					/>
					<datalist id="clients">
						{clients.map(client => {
							return (
								<option key={client.id} value={client.CompanyName}>
									{client.CompanyName}
								</option>
							);
						})}
					</datalist>
				</StyledLabel>
				<StyledLabel>
					Select a Service
					<StyledInput
						list="services"
						{...register('service')}
						placeholder="Select a Service"
					/>
					<datalist id="services">
						{services.map(service => {
							return (
								<option key={service.id} value={service.serviceName}>
									{service.serviceName}
								</option>
							);
						})}
					</datalist>
				</StyledLabel>
				<StyledLabel>
					Worked Hours
					<StyledInput
						placeholder="20"
						type="number"
						{...register('workedHours', {
							required: {value: true, message: 'This field is required.'},
							maxLength: {
								value: 3,
								message: 'The max. input is 3 characters.',
							},
							minLength: {
								value: 1,
								message: 'This input requires at least one character.',
							},
							pattern: {
								value: '[0-9]?',
								message: 'This input is number only.',
							},
						})}
					/>
					<ErrorMessage
						errors={errors}
						name="workedHours"
						render={({messages}) =>
							messages &&
							Object.entries(messages).map(([type, message]) => (
								<StyledError key={type}>{message}</StyledError>
							))
						}
					/>
				</StyledLabel>
				<StyledLabel>
					Price / Hour
					<StyledInput
						placeholder="80"
						type="number"
						{...register('priceHour', {
							required: {value: true, message: 'This field is required.'},
							minLength: {
								value: 1,
								message: 'This input requires at least one character.',
							},
							pattern: {
								value: '[0-9]?',
								message: 'This input is number only.',
							},
						})}
					/>
					<ErrorMessage
						errors={errors}
						name="priceHour"
						render={({messages}) =>
							messages &&
							Object.entries(messages).map(([type, message]) => (
								<StyledError key={type}>{message}</StyledError>
							))
						}
					/>
				</StyledLabel>
				<StyledLabel>
					Tax Key
					<StyledFieldset>
						<StyledRadioInput0
							value="0"
							name="taxKey"
							type="radio"
							{...register('taxKey')}
						/>

						<StyledRadioInput7
							value="7"
							name="taxKey"
							type="radio"
							{...register('taxKey')}
						/>

						<StyledRadioInput19
							name="taxKey"
							type="radio"
							value="19"
							checked
							{...register('taxKey')}
						/>
					</StyledFieldset>
				</StyledLabel>
				<StyledSubmitButton name="submitButton" type="submit">
					Submit
				</StyledSubmitButton>
				<StyledNotice>All input fields are required</StyledNotice>
			</StyledForm>
		</StyledWrapper>
	);
}
