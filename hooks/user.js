import useSWR from "swr";
// useSWR is caching library
const fetcher = (url) => fetch(url).then((r) => r.json());

// custom hook to get the logged in user
export function useCurrentUser() {
    const { data, mutate } = useSWR("/api/user", fetcher);
    const user = data?.user;
    return [user, { mutate: (data) => mutate("/api/user", data)}];
}

