import axios from 'axios';

axios.defaults.baseURL = "https://localhost:44347";

const sendEmail = (emailData) => {
    return axios.post("/api/email", emailData)
        .then(response => {
            return response.data;
        }).catch(error => {
            return error;
        });
}

export default sendEmail;