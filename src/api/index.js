import axios from "axios"

const url = "http://localhost:3000";

function clearProperties(obj) {
    const objClean = {};
    for(const prop in obj) {
        const value = obj[prop];
        if(value != null) {
            if(Object.prototype.hasOwnProperty.call(obj, prop) && 
               (typeof value === "number" ||
                typeof value === "string" ||
                typeof value === "boolean" ||
                value instanceof Date ||
                value instanceof Array && value.filter(item => (typeof item !== "number" && typeof item !== "string")).length == 0)) {
                    objClean[prop] = value;
            }
        }
    }
    return objClean;
}

function newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
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
        if(path && obj && obj.Title) {
            obj.ID = newGuid();
            obj.AuthorID = obj.EditorID = "1";
            obj.Created = obj.Modified = new Date();
            obj.EditVersion = 0;
            return axios.post(url + "/" + path, clearProperties(obj));
        }
    },
    update(path, id, obj) {
        if(path && id && obj && obj.Title) {
            obj.EditorID = "1";
            obj.Modified = new Date();
            obj.EditVersion = (obj.EditVersion || 0) + 1;
            return axios.put(url + "/" + path + "/" + id, clearProperties(obj));
        }
    },
    delete(path, id) {
        if(path && id) {
            return axios.delete(url + "/" + path + "/" + id);
        }
    }
}