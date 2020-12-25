<template>
<div>
<h2>Crear Estudiantes</h2>
  <el-form ref="Rulesform" v-loading="loading" label-width="120px" label-position='center' :model="form" :rules="rules">

      <el-form-item label="Nombre" prop="nombre">
        <el-input v-model="form.nombre" ></el-input>
      </el-form-item>
  
      <el-form-item label="Apellido">
        <el-input v-model="form.apellido"></el-input>
      </el-form-item>
  
      <el-form-item label="Telefono">
        <el-input v-model="form.telefono"></el-input>
      </el-form-item>
  
      <el-form-item label="Estatus">
        <el-input v-model="form.estatus"></el-input>
      </el-form-item>
  
      <el-form-item label="Correo">
        <el-input v-model="form.correo"></el-input>
      </el-form-item>
  
      <el-form-item label="Direccion">
        <el-input v-model="form.direccion"></el-input>
      </el-form-item>
  
      <el-form-item label="Clave">
        <el-input v-model="form.clave"  type="password"></el-input>
      </el-form-item>
 
      <el-form-item label="Rol">
        <el-input v-model="form.rol"></el-input>
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
  name: "estudianteCreate",
  data() {
    return {
      loading:false,
      form:{
        IDestudiante:0,
        nombre:null,
        apellido:null,
        telefono:null,
        estatus:null,
        correo:null,
        direccion:null,
        clave:null,
        rol:null,
      },
      
      rules:{
        nombre:[
          {required:true, message:'Debe de ingresar un nombre'},
          {min:3, message:"El nombre debe de ser mayor a tres caracteres"},
        ],
      }
     // loading: false,
      //items: []
    };
  },
  created() {
    let self = this;
    self.getPorID(self.$route.params.id);
  },
  methods: {
    getPorID(IDestudiante){
      if(IDestudiante ==undefined) return;
      // console.log(IDestudiante)
      let self = this; 
          self.loading = true;
           self.$store.state.services.studentService
          
            .getPorID(IDestudiante)
            .then(r => {
              console.log(r.data[0])
              self.loading = false;
              self.form.IDestudiante = r.data[0].IDestudiante,
              self.form.nombre = r.data[0].nombre,
              self.form.apellido = r.data[0].apellido,
              self.form.telefono = r.data[0].telefono,
              self.form.estatus = r.data[0].estatus,
              self.form.correo = r.data[0].correo,
              self.form.direccion = r.data[0].direccion,
              self.form.clave = r.data[0].clave,
              self.form.rol = r.data[0].rol
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

           if(self.form.IDestudiante > 0){
             console.log('hola')
             

             self.formPut.IDestudiante = self.form.IDestudiante,
             console.log(self.form);
             self.$store.state.services.studentService
            .updateEstudiante(this.form)
            .then(r => {
              self.loading = false;
              self.$router.push('/students/');
            })
            .catch(r => {
                self.$mensaje({
                    message:"Ocurrió un error",
                    type:"error"
                });

            });

           }else{
            console.log(self.form); 
             self.$store.state.services.studentService
            .add(self.form)
            .then(r => {
              self.loading = false;
              self.$router.push('/students/');
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