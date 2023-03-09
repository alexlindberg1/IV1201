import { API_URL } from '../config';
import { api } from '../utils/api';

export const fetchApplications = async (cursor=0, size=10) => {
	return api
		.get(`${API_URL}/api/applicants?size=${size}&offset=${cursor * size}&orderBy=asc`)
		.then(({ data }) => {
			data["size"] = size
			data["cursor"] = Math.ceil(data.offset / Math.max(1, size))
			return data;
		})
		.catch(console.error);
};

export const fetchApplicant = async ({ queryKey }) => {
	const [_key, { personId }] = queryKey;
	if (!!personId) {
		return api
			.get(`${API_URL}/api/applicants/${personId}?include=availabilities&include=competences`)
			.then(({ data }) => {
				return data;
			})
			.catch(console.error);
	}
};

export const submitApplication = async (submission) => {
	return api
		.post(`${API_URL}/api/applications`, submission)
		.then(({ data }) => {
			
			return data;
		})
		.catch(console.error);
}