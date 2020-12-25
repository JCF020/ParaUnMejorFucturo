<template>
<div>
<h2>Estudiantes</h2>
<div v-loading="loading">
  <el-table :data="items" :default-sort = "{prop: 'IDestudiante', order: 'ascending'}" style="width: 100%">
    <el-table-column prop="IDestudiante" label="#" sortable width="50"></el-table-column>
    <el-table-column prop="nombre" label="nombre" sortable>
      <!-- <template slot-scope="scope">
        <a :href="'#/example/' + scope.row.id">{{ scope.row.title }}</a>
      </template> -->
    </el-table-column>
    <el-table-column prop="telefono" label="Telefono"></el-table-column>
    <el-table-column prop="correo" label="Correo"></el-table-column>
    <el-table-column prop="direccion" label="Dirección"></el-table-column>
    <el-table-column>
      <template slot-scope="scope">
        <el-button @click="$router.push(`/students/${scope.row.IDestudiante}/edit`)">Editar</el-button>
         <el-button type="danger" @click="deleteEstudiante(scope.row.IDestudiante)">Eliminar</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
</div>
</template>

<script>
export default {
  name: "estudianteIndex",
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
      let self = this;
      self.loading = true;

      self.$store.state.services.studentService
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
    deleteEstudiante(id){
      let self = this;
      self.loading = true;
      
      self.$store.state.services.studentService
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