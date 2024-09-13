import axios from 'axios';
import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from '../constants/config';

import { getAccessToken, getType } from '../utils/common-utils';



const API_URL = 'http://localhost:8000';

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        "Accept": "application/json, multipart/form-data",
        "Content-Type": "application/json"
    }
});

axiosInstance.interceptors.request.use(
    function (config) {
        if (config.TYPE.params) {
            config.params = config.TYPE.params
        } else if (config.TYPE.query) {
            config.url = config.url + '/' + config.TYPE.query;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    function (response) {
        return processResponse(response);
    },
    function (error) {
        return Promise.reject(ProcessError(error));
    }
)



const processResponse = (response) => {
    if (response?.status === 200) {
        return { isSuccess: true, data: response.data }
    } else {
        return {
            isFailure: true,
            status: response?.status,
            msg: response?.msg,
            code: response?.code
        }
    }
}



const ProcessError = async (error) => {
    if (error.response) {
        if (error.response?.status === 403) {
           
            sessionStorage.clear();
            
        } else {
            console.log("ERROR IN RESPONSE: ", error.toJSON());
            return {
                isError: true,
                msg: API_NOTIFICATION_MESSAGES.responseFailure,
                code: error.response.status
            }
        }
    } else if (error.request) {
        console.log("ERROR IN RESPONSE: ", error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.requestFailure,
            code: ""
        }
    } else {
        console.log("ERROR IN RESPONSE: ", error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.networkError,
            code: ""
        }
    }
}

const API = {
    // Like a post
    likePost: (postId) =>
        axiosInstance({
            method: 'POST',
            url: '/like', // Updated URL to match backend route
            data: { postId },
            headers: {
                authorization: getAccessToken(),
            }
        }),

     // Unlike a post
     unlikePost: async (postId) => {
        try {
            console.log("Unliking post with ID:", postId);
            const response = await axiosInstance({
                method: 'DELETE',
                url: '/unlike', // Updated URL to match backend route
                data: { postId },
                headers: {
                    authorization: getAccessToken(),
                }
            });
            console.log("Unlike response:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error unliking post:", error);
            return ProcessError(error); // Adjust according to your error handling
        }
    },
    
        getLikesCount: (postId) =>
            axiosInstance({
                method: 'GET',
                url: `/likes/count?postId=${postId}`, // Endpoint to get total likes count
                headers: {
                    authorization: getAccessToken(),
                }
            }),
};


for (const [key, value] of Object.entries(SERVICE_URLS)) {
    API[key] = (body, showUploadProgress, showDownloadProgress) =>
        axiosInstance({
            method: value.method,
            url: value.url,
            data: value.method === 'DELETE' && value.url !== '/unlike'? {} : body,
            responseType: value.responseType,
            headers: {
                authorization: getAccessToken(),
            },
            TYPE: getType(value, body),
            onUploadProgress: function (progressEvent) {
                if (showUploadProgress) {
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showUploadProgress(percentCompleted);
                }
            },
            onDownloadProgress: function (progressEvent) {
                if (showDownloadProgress) {
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showDownloadProgress(percentCompleted);
                }
            }
        });
}

export { API };