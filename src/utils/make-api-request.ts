import { BASE_URL } from "../lib/Constants";

interface ApiRequestOptions {
	next?: {
		revalidate?: number;
	};
}

export async function makeApiRequest(
	endpoint: string,
	token: string,
	options: ApiRequestOptions = {}
) {
	const response = await fetch(`${BASE_URL}/api${endpoint}`, {
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		...options,
	});

	return response;
} 