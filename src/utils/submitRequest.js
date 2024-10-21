import axios from 'axios';
import SubmitMethods from '../types/SubmitMethods';

const getContentType = (method) => {
    if (method === SubmitMethods.POST_URLENCODED) {
        return 'application/x-www-form-urlencoded';
    } else if (method === SubmitMethods.POST_MULTIPART) {
        return 'multipart/form-data'
    } else {
        return null;
    }
}

const submitRequest = async (serverProxy, endpoint, method, params) => {
  try {
    let response;
    if (serverProxy) {
      const requestBody = {
        endpoint: endpoint,
        method: (method === SubmitMethods.GET)?'GET':'POST',
        contentType: getContentType(method),
        requestParams: params
      }
      response = await axios.post('/proxy', requestBody);
      return response.data;
    } else {
        return {access_token: new Date()};
        /* if (method === SubmitMethods.GET) {
            if (params) {
                const urlParams = new URLSearchParams(params);
                response = await axios.get(`${endpoint}?${urlParams.toString()}`);
            } else {
                response = await axios.get(`${endpoint}}`);
            }
        } else if (method === SubmitMethods.POST_URLENCODED) {
            const urlEncodedParams = new URLSearchParams(params);
            console.log(urlEncodedParams.toString());
            response = await axios.post(endpoint, urlEncodedParams.toString(), {
                headers: { 'Content-Type':  getContentType(method)},
            });
        } else if (method === SubmitMethods.POST_MULTIPART) {
            const formData = new FormData();
            Object.keys(params).forEach((key) => {
                formData.append(key, params[key]);
            });
            response = await axios.post(endpoint, formData, {
                headers: { 'Content-Type':  getContentType(method)},
            });
        }

        return response.data; */
    }
  } catch (error) {
    console.error("Error during request submission:", error);
    throw error;
  }
};

export default submitRequest;
