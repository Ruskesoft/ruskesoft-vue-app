import axios from "axios"

const url = "http://localhost:3000";

function clearProperties(obj) {
    const cleanObj = {};
    for(const prop in obj) {
        const value = obj[prop];
        if(value) {
            if(Object.prototype.hasOwnProperty.call(obj, prop) && 
               (typeof value === "number" ||
                typeof value === "string" ||
                typeof value === "boolean" ||
                value instanceof Date ||
                value instanceof Array && value.filter(item => typeof item !== "number").length == 0)) {
                    cleanObj[prop] = value;
            }
        }
    }
    return cleanObj;
}

export default {
    load(path, id) {
        if(path) {
            if(id) {
                return axios.get(url + "/" + path + "/" + id);
            }
            return axios.get(url + "/" + path);
        }
    },
    create(path, obj) {
        if(path && obj) {
            return axios.post(url + "/" + path, clearProperties(obj));
        }
    },
    update(path, id, obj) {
        if(path && id && obj) {
            return axios.put(url + "/" + path + "/" + id, clearProperties(obj));
        }
    },
    delete(path, id) {
        if(path && id) {
            return axios.delete(url + "/" + path + "/" + id);
        }
    }
}