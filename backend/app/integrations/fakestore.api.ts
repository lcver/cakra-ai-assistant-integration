import { fetchApi } from "../utils/fetchApi";

const API_URL = "https://fakestoreapi.com/";

export const fetchAllProducts = async () => {
    const response = await fetchApi(`${API_URL}/products`);
    return response;
};

export const fetchProductById = async (id: number) => {
    const response = await fetchApi(`${API_URL}/products/${id}`);
    return response;
};

export const searchProductByKeyword = async (keyword: string) => {
    const response = await fetchApi(`${API_URL}/products`);
    const results = response.data.filter((p: any) =>
        p.title.toLowerCase().includes(keyword.toLowerCase())
    );
    return results;
};
