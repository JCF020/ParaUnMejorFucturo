<template>
<div>
<h2>Lista De Materias</h2>
<div v-loading="loading">
  <el-table :data="items" :default-sort = "{prop: 'IDmateria', order: 'ascending'}" style="width: 100%">
    <el-table-column prop="IDmateria" label="#" sortable width="50"></el-table-column>
    
    <el-table-column prop="descripcion" label="Descripcion de la materia"></el-table-column>
    <el-table-column prop="credito" label="Credito"></el-table-column>
    <el-table-column prop="precio" label="Precio" sortable></el-table-column>
    <el-table-column prop="estatus" label="Estatus" sortable></el-table-column>
    <el-table-column>
      <template slot-scope="scope">
        <el-button @click="$router.push(`/materias/${scope.row.IDmateria}/edit`)">Editar</el-button>
         <el-button type="danger" @click="deleteMateria(scope.row.IDmateria)">Eliminar</el-button>
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

      self.$store.state.services.materiaService
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
    deleteMateria(id){
      let self = this;
      self.loading = true;
      
      self.$store.state.services.materiaService
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