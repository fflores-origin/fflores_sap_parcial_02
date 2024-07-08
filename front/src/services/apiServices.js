import axios from 'axios';

const BASEAPI = 'https://localhost:7251/api/Logistics';

export const getShortestByOrigin = async (origin) => {
    try {
        const response = await axios.get(`${BASEAPI}/shortestByOrigin`, { params: { origin } });
        return response.data;
    } catch (error) {
        console.error('Error fetching data from API', error);
        throw error;
    }
}