import React from 'react';
import axios from 'axios';

/**
 * @param  {string} endpoint - API endpoint
 * @param  {string} data={} - to store response data
 * 
 * @return {string} url - endpoint
 * @return {string} method - get method
 * @return {string} data - returns either the response data or error message
 */

// insert idtoken in param
export default (endpoint, data={}) => {
    //console.log(endpoint)
    return axios({
        url: endpoint,
        method: "get",
        data: data
    })
    .then( (response) => { // promises handling 
        return response.data;        
    })
    .catch( (error) => {        
        console.error('error in axios ' + error);
        return {error: error};            
    });    
};

