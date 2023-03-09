import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { fetchApplicant, fetchApplications, login, logout } from '../api';
import { submitApplication } from '../api/applications';
import { signup } from '../api/auth';

export const mutateLogin = () =>
	useMutation({
		mutationKey: ['Login'],
		mutationFn: async ({ username, password }) => {
			return login({ username, password });
		},
		suspend: true,
	});

export const mutateSignup = () =>
	useMutation({
		mutationKey: ['Signup'],
		mutationFn: async ({ name, surname, pnr, email, username, password }) => {
			return signup({ name, surname, pnr, email, username, password });
		},
		suspend: true,
	});

export const mutateLogout = () =>
	useMutation({
		mutationKey: ['Logout'],
		mutationFn: async () => {
			return logout();
		},
	});

export const mutateSubmission = () =>
	useMutation({
		mutationKey: ['Submission'],
		mutationFn: async (submission) => {
			return submitApplication(submission);
		},
	});

export const queryApplicant = (personId, isOpen) => {
	return useQuery({
		queryKey: ['applicant', { personId: personId }],
		queryFn: fetchApplicant,
		enabled: isOpen,
	});
};

/**
 * Fetches a paginated list of applications.
 *
 * @param {int} offset The current offset
 * @param {int} size The amount of applications to fetch
 * @returns A list of objects including applications,
 * 	the offset used, the size used and total count of items
 */
export const queryApplications = (offset = 0, size = 10) =>
	useInfiniteQuery({
		queryKey: ['applicants', { size: size }],
		queryFn: ({ pageParam = 0 }) => fetchApplications(pageParam, size),
		keepPreviousData: true,
		getNextPageParam: (lastPage) => {
			const { offset, size, total_count } = lastPage ?? {
				offset: offset,
				size: size,
				total_count: 0,
			};
			return Math.min(offset + size, total_count - 1);
		},
		getPreviousPageParam: (_, pages) => {
			const { offset, size } = pages[pages?.length - 1] ?? {
				offset: 0,
				size: 10,
			};
			return Math.max(offset - size, 0);
		},
	});
