<template>
<div>
<h2>Lista De Horarios</h2>
<div v-loading="loading">
  <el-table :data="items" :default-sort = "{prop: 'IDhorario', order: 'ascending'}" style="width: 100%">
    <el-table-column prop="IDhorario" label="#" sortable width="50"></el-table-column>
    
    <el-table-column prop="descripcion" label="Descripción de los horarios"></el-table-column>
    
    <el-table-column>
      <template slot-scope="scope">
        <el-button @click="$router.push(`/horarios/${scope.row.IDhorario}/edit`)">Editar</el-button>
         <el-button type="danger" @click="deleteHorario(scope.row.IDhorario)">Eliminar</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
</div>
</template>

<script>
export default {
  name: "horarioIndex",
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
     // console.log("hola")
      let self = this;
      self.loading = true;

      self.$store.state.services.horarioService
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
    deleteHorario(id){
      let self = this;
      self.loading = true;
      
      self.$store.state.services.horarioService
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