import axios from "axios";

export default async function submitForm<T>(url: string, data: any): Promise<T> {
    return (await axios.post<T>(url, data, { withCredentials: true })).data;
}