interface OrderPaymentResponse {
	data: {
		order: {
			reference: string;
			processor_reference: string;
			order_payment_reference: string;
			amount: number;
			fee: number;
			fee_rate: number;
			status_id: number;
			status: string;
			currency: string;
			narration: string;
		};
		subsidiary: {
			id: number;
			name: string;
			country: string;
			support_email: string;
			customization: any[]; // Use specific type if available
		};
		customer: {
			email: string;
			first_name: string;
			last_name: string;
			mobile: string;
			country: string;
		};
		payment: null | Record<string, unknown>; // Define structure if known, else use Record for any object
		other_payment_options: {
			code: string;
			name: string;
			currency: string;
		}[];
		saved_cards: any[]; // Use specific type if available
		subsidiary_order_summary: {
			order_name: string;
			total_amount: number;
			reference: string;
			currency: string;
			order_items: {
				name: string;
				amount: number;
			}[];
		};
	};
	status: string;
	message: string;
}

interface CardOrderResponse {
	data: {
		card: null | Record<string, unknown>; // Define structure if available
		payment_detail: {
			redirect_url: string;
			recipient_account: string | null;
			recipient_name: string | null;
			payment_reference: string;
		};
		bank_transfer_details: null | Record<string, unknown>; // Define structure if available
		order_payment: {
			order_id: number;
			order_payment_reference: string;
			currency: string;
			status_id: number;
			order_payment_response_code: string;
			order_payment_response_message: string;
			order_payment_instrument: null | Record<string, unknown>; // Define structure if available
			remarks: string;
			total_amount: number;
			fee: number;
		};
	};
	status: string;
	message: string;
}

interface bankAccountsDataType {
	account_name: string;
	account_number: string;
	bank_name: string;
	sort_code: string;
	iban: string;
	bic: string;
	country_code: string;
}
