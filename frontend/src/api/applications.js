import { API_URL } from "../config";
import { api } from "../utils/api";

export const fetchApplications = async () => {
  return api
    .get(`${API_URL}/api/applicants`)
    .then(({ data }) => {
      return data;
    })
    .catch(console.error);
};

export const fetchApplication = async () => {
  return api
    .get(`${API_URL}/api/applicant`)
    .then(({ data }) => {
      return data;
    })
    .catch(console.error);
};
