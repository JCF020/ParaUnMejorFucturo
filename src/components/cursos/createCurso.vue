<template>
<div>
<h2>Crear Curso Para Estudiante</h2>
  <el-form ref="Rulesform" v-loading="loading" label-width="200px" label-position='center' :model="form" :rules="rules">

     

  <el-form-item label="Materia">
    <el-select v-model="form.IDmateria"  placeholder="Selecciona una Materia">
      <el-option v-for="(item, index) in datosMateria.materia" :key="index"  :value="item.IDmateria">
        {{ item.descripcion }}
      </el-option>
      
    </el-select>
  </el-form-item>
      
      <el-form-item label="Estudiantes">
         <el-select v-model="form.IDestudiante"  placeholder="Selecciona un Estudiante"> 
            <el-option v-for="(item, index) in datosEstudiante.estudiante" :key="index" :value="item.IDestudiante">
              {{ item.nombre }}
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
        IDestudiante_materia:0,
        
        IDmateria:0,
        materia:null,
        IDestudiante:0,
        estudiante:null,
      },
      datosEstudiante:{
        estudiante:null
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
    self.getEstudiante();
    
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

    getEstudiante(){
      
      let self = this;
      self.loading = true;

      self.$store.state.services.studentService
        .getAll()
        .then(r => {
          self.loading = false;
          self.datosEstudiante.estudiante = r.data;
          //console.log(self.datosEstudiante.horario)
        })
        .catch(r => {
            self.$mensaje({
                message:"Ocurrió un error",
                type:"error"
            });

        });
    },
    getPorID(IDestudiante_materia){
      if(IDestudiante_materia ==undefined) return;
      // console.log(IDestudiante_materia)
      let self = this; 
          self.loading = true;
           self.$store.state.services.cursoService
          
            .getPorID(IDestudiante_materia)
            .then(r => {
              console.log(r.data[0])
              self.loading = false;
              self.form.IDestudiante_materia = r.data[0].IDestudiante_materia,
              
              self.form.IDestudiante = r.data[0].IDestudiante
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

           if(self.form.IDestudiante_materia > 0){
             //.log('hola')
             
            console.log(self.form);
             self.$store.state.services.cursoService
            .updateCursos(this.form)
            .then(r => {
              self.loading = false;
              self.$router.push('/cursos/');
            })
            .catch(r => {
                self.$mensaje({
                    message:"Ocurrió un error",
                    type:"error"
                });

            });

           }else{
            console.log(self.form); 
             self.$store.state.services.cursoService
            .add(self.form)
            .then(r => {
              self.loading = false;
              self.$router.push('/cursos/');
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