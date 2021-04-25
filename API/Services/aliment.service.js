import http from "../config/http-common";

class AlimentDataService {
    getAll() {
        return http.get("/aliments");
    }

    get(id) {
        return http.get(`/aliments/${id}`);
    }

    create(data) {
        return http.post("/aliments", data);
    }

    update(id, data) {
        return http.put(`/aliments/${id}`, data);
    }

    delete(id) {
        return http.delete(`/aliments/${id}`);
    }

    deleteAll() {
        return http.delete(`/aliments`);
    }

    findByTitle(title) {
        return http.get(`/aliments?title=${title}`);
    }
}

export default new AlimentDataService();
