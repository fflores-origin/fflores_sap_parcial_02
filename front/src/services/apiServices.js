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


export const getAllTrucks = async () => {
    try {
        const response = await axios.get(`${BASEAPI}/getTrucks`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data from API', error);
        throw error;
    }
}

export const getTravelsByTruckCode = async (code) => {
    try {
        const response = await axios.get(`${BASEAPI}/getLastTravelsByTruckCode`, { params: { code } });
        return response.data;
    } catch (error) {
        console.error('Error fetching data from API', error);
        throw error;
    }
}


export const getTravelingTrucks = async () => {
    try {
        const response = await axios.get(`${BASEAPI}/getTravelingTrucks`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data from API', error);
        throw error;
    }
}