<template>
<div>
<h2>Cursos de Estudiantes</h2>
<div v-loading="loading">
  <el-table :data="items" :default-sort = "{prop: 'IDestudiante_materia', order: 'ascending'}" style="width: 100%">
    <el-table-column prop="IDestudiante_materia" label="#" sortable width="50"></el-table-column>
    
    <el-table-column prop="estudiante" label="Estudiantes"></el-table-column>
    <el-table-column prop="materia" label="Materias"></el-table-column>
    <!-- <el-table-column prop="horario" label="Horario" sortable></el-table-column> -->
    <el-table-column>
      <template slot-scope="scope">
        <el-button @click="$router.push(`/cursos/${scope.row.IDestudiante_materia}/edit`)">Editar</el-button>
         <el-button type="danger" @click="deleteCurso(scope.row.IDestudiante_materia)">Eliminar</el-button>
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

      self.$store.state.services.cursoService
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
    deleteCurso(id){
      let self = this;
      self.loading = true;
      
      self.$store.state.services.cursoService
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