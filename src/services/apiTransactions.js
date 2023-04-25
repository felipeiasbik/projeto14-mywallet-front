import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

function createConfig(token){
    return {
        headers : {
            Authorization: `Bearer ${token}`
        }
    }
}

function homePage(token){
    const promise = axios.get("/home", createConfig(token))
    return promise;
}

function postTransaction(body, token){
    const promise = axios.post("/nova-transacao", body, createConfig(token));
    return promise;
}

const apiTransactions = { homePage, postTransaction };
export default apiTransactions;