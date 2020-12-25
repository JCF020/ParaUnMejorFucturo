class MateriaService {
    axios
    baseUrl

    constructor(axios,apiUrl) {
        this.axios = axios
        this.baseUrl = `${apiUrl}horarios`
    }

    getAll(params) {
       // console.log("adios")
        let self = this;
        return self.axios.get(`${self.baseUrl}`);
    }

   getPorID(id) {
       let self = this;
       return self.axios.get(`${self.baseUrl}/${id}`);
   }

    add(model){
        let self = this;
        return self.axios.post(`${self.baseUrl}`,model);
    }

    updateHorario(model){
        let self = this;
        return self.axios.put(`${self.baseUrl}`,model);
    }

    remove(id) {
        let self = this;
        return self.axios.delete(`${self.baseUrl}/${id}`);
    }
    getPorCorreo(model) {
        let self = this;
        console.log(model);
        return self.axios.get(`${self.baseUrl}?value=${model}`);
    }

    getPrueba(id) {
        let self = this;
        return self.axios.get(`${self.baseUrl}posts/${id}`);
    }
}

export default MateriaService