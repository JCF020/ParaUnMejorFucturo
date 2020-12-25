<template>
<div>
<h2>Crear Aula</h2>
  <el-form ref="Rulesform" v-loading="loading" label-width="200px" label-position='center' :model="form" :rules="rules">

      <el-form-item label="Descripción De Aula" prop="descripcion">
        <el-input v-model="form.descripcion" ></el-input>
      </el-form-item>

  <el-form-item label="Materia">
    <el-select v-model="form.IDmateria"  placeholder="Selecciona una Materia">
      <el-option v-for="(item, index) in datosMateria.materia" :key="index"  :value="item.IDmateria">
        {{ item.descripcion }}
      </el-option>
      
    </el-select>
  </el-form-item>
      
      <el-form-item label="Horario">
         <el-select v-model="form.IDhorario"  placeholder="Selecciona un Horario"> 
            <el-option v-for="(item, index) in datosHorario.horario" :key="index" :value=item.IDhorario>
              {{ item.descripcion }}
            </el-option>
      
         
   <!-- <el-option v-for="form.horario" v-bind:"form.horario.IDhorario" :value="form.horario.IDhorario" label="Zone one" value="shanghai"></el-option> -->
          
        </el-select> 
      </el-form-item>
  
      
  
  
      <el-form-item>
        <el-button type="primary" @click="save">Create</el-button>
        <el-button>Cancel</el-button>
      </el-form-item>
  </el-form>
</div>
</template>

<script>
export default {
  name: "aulaCreate",
  data() {
    return {
      loading:false,
      form:{
        IDaula:0,
        descripcion:null,
        IDmateria:0,
        materia:null,
        IDhorario:0,
        horario:null,
      },
      datosHorario:{
        horario:null
      },
      datosMateria:{
        materia:null
      },
      
      rules:{
        descripcion:[
          {required:true, message:'Debe de ingresar una descripción'},
          {min:3, message:"La descripción debe de ser mayor a tres caracteres"},
        ],
      }
     // loading: false,
      //items: []
    };
  },
  created() {
    let self = this;
    self.getPorID(self.$route.params.id);
    self.getMateria();
    self.getHorario();
    
  },
  methods: {
    getMateria(){
      //console.log("hola")
      let self = this;
      self.loading = true;

      self.$store.state.services.materiaService
        .getAll()
        .then(r => {
          self.loading = false;
          //self.items = r.data;
          //console.log(r.data)
          self.datosMateria.materia = r.data
          //self.form.horario = r.data[0].horario
        })
        .catch(r => {
            self.$mensaje({
                message:"Ocurrió un error",
                type:"error"
            });

        });
    },

    getHorario(){
      
      let self = this;
      self.loading = true;

      self.$store.state.services.horarioService
        .getAll()
        .then(r => {
          self.loading = false;
          self.datosHorario.horario = r.data;
          //console.log(self.datosHorario.horario)
        })
        .catch(r => {
            self.$mensaje({
                message:"Ocurrió un error",
                type:"error"
            });

        });
    },
    getPorID(IDaula){
      if(IDaula ==undefined) return;
      // console.log(IDaula)
      let self = this; 
          self.loading = true;
           self.$store.state.services.aulaService
          
            .getPorID(IDaula)
            .then(r => {
              console.log(r.data[0])
              self.loading = false;
              self.form.IDaula = r.data[0].IDaula,
              self.form.descripcion = r.data[0].descripcion
              self.form.IDhorario = r.data[0].IDhorario
              self.form.IDmateria = r.data[0].IDmateria
            })
            .catch(r => {
                self.$mensaje({
                    message:"Ocurrió un error",
                    type:"error"
                });

            });
  },

  save(){
      let self = this; 
      self.$refs['Rulesform'].validate((valid)=>{
        if(valid){
          //self.loading = true;
            //console.log(this.form);

           if(self.form.IDaula > 0){
             //.log('hola')
             
            console.log(self.form);
             self.$store.state.services.aulaService
            .updateEstudiante(this.form)
            .then(r => {
              self.loading = false;
              self.$router.push('/aulas/');
            })
            .catch(r => {
                self.$mensaje({
                    message:"Ocurrió un error",
                    type:"error"
                });

            });

           }else{
            console.log(self.form); 
             self.$store.state.services.aulaService
            .add(self.form)
            .then(r => {
              self.loading = false;
              self.$router.push('/aulas/');
            })
            .catch(r => {
                self.$mensaje({
                    message:"Ocurrió un error",
                    type:"error"
                });

            });
           } 
           
        }
      }); 
    }
   
  }
};
</script>