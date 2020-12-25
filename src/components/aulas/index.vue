<template>
<div>
<h2>Aulas</h2>
<div v-loading="loading">
  <el-table :data="items" :default-sort = "{prop: 'IDaula', order: 'ascending'}" style="width: 100%">
    <el-table-column prop="IDaula" label="#" sortable width="50"></el-table-column>
    
    <el-table-column prop="descripcion" label="Descripcion de aula"></el-table-column>
    <el-table-column prop="materia" label="Materia"></el-table-column>
    <el-table-column prop="horario" label="Horario" sortable></el-table-column>
    <el-table-column>
      <template slot-scope="scope">
        <el-button @click="$router.push(`/aulas/${scope.row.IDaula}/edit`)">Editar</el-button>
         <el-button type="danger" @click="deleteAula(scope.row.IDaula)">Eliminar</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
</div>
</template>

<script>
export default {
  name: "aulasIndex",
  data() {
    return {
      loading: false,
      items: []
    };
  },
  created() {
        let self = this;
        self.getAll();
  },
  methods: {
    
    getAll() {
      console.log("hola")
      let self = this;
      self.loading = true;

      self.$store.state.services.aulaService
        .getAll()
        .then(r => {
          self.loading = false;
          self.items = r.data;
        })
        .catch(r => {
            self.$mensaje({
                message:"Ocurrió un error",
                type:"error"
            });

        });
    },
    deleteAula(id){
      let self = this;
      self.loading = true;
      
      self.$store.state.services.aulaService
        .remove(id)
        .then(r => {
          self.loading = false;
          //self.items = r.data;
          self.getAll();
        })
        .catch(r => {
            self.$mensaje({
                message:"Ocurrió un error",
                type:"error"
            });

        });
    }
  }
};
</script>