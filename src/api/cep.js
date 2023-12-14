import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://viacep.com.br/ws/'
});

export default {
  cep: (cep) => {
    return axiosInstance.get(`${cep}/json`);
  },

};