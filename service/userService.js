import axios from "../axios";
import qs from 'qs';

class UserService {
    saveUser = async (data) => {
        console.log("form data: " + qs.stringify(data))
        const promise = new Promise((resolve, reject) => {
            axios.post('user', qs.stringify(data))
                .then((res) => {
                    return resolve(res)
                })
                .catch((er) => {
                    console.log('error: ' + er);
                    return resolve(er)
                })
        })
        return await promise
    }

    getUsers = async () => {
        const promise = new Promise((resolve, reject) => {
            axios.get('user')
                .then((res) => {
                    return resolve(res)
                })
                .catch((er) => {
                    return resolve(er)
                })
        })
        return await promise
    }

    updateUser = async (data) => {
        console.log("form data: " + JSON.stringify(data))
        const config = {headers: {'Content-Type': 'application/json'}}
        const promise = new Promise((resolve, reject) => {

            axios.put('user', JSON.stringify(data),config)
                .then((res) => {
                    return resolve(res)
                })
                .catch((er) => {
                    console.log('error: ' + er);
                    return resolve(er)
                })
        })
        return await promise
    }
    
    deleteUser = async (params) => {
        const promise = new Promise((resolve, reject) => {
            axios.delete('user', {params: params})
                .then((res) => {
                    return resolve(res)
                })
                .catch((err) => {
                    return resolve(err)
                })
        })
        return await promise;
    };

}
export default new UserService();