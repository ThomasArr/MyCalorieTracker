import http from "../config/http-common";

class historiqueDataService {
    getAll() {
        return http.get("/historique");
    }

    get(id) {
        return http.get(`/historique/${id}`);
    }

    create(data) {
        return http.post("/historique", data);
    }

    update(id, data) {
        return http.put(`/historique/${id}`, data);
    }

    delete(id) {
        return http.delete(`/historique/${id}`);
    }

    deleteAll() {
        return http.delete(`/historique`);
    }

    findByTitle(title) {
        return http.get(`/historique?title=${title}`);
    }
}

export default new historiqueDataService();
