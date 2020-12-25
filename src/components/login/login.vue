<template>
<div>
<h2>Login</h2>
<el-form  status-icon ref="Rulesform" v-loading="loading" :model="form" :rules="rules"  label-width="120px" class="demo-ruleForm">

  <el-form-item label="Correo" prop="correo">
    <el-input autocomplete="on" v-model="form.correo" ></el-input>
  </el-form-item>
  <el-form-item label="Clave" prop="clave">
    <el-input type="password" v-model="form.clave" autocomplete="off"></el-input>
  </el-form-item>
  
  <el-form-item>
    <el-button type="primary" @click="buscar">Inicio</el-button>
    <!-- <el-button @click="resetForm('ruleForm')">Reset</el-button> -->
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
        correo:[
          {required:true, message:'Debe de ingresar un correo'},
          {min:3, message:"El nombre debe de ser mayor a tres caracteres"},
        ],
        clave:[
          {required:true, message:'Debe de ingresar una clave'},
          //{min:3, message:"El nombre debe de ser mayor a tres caracteres"},
        ],
      }
     // loading: false,
      //items: []
    };
  },
  created() {
   // let self = this;
   // self.getAll();
  },
  methods: {
    buscar(){
      let self = this; 
      self.$refs['Rulesform'].validate((valid)=>{
        if(valid){
          //console.log(self.form.correo);
           self.$store.state.services.studentService
           .getPorCorreo(self.form.correo)
            .then(r => {
              self.loading = false;
              //self.$router.push('/');
            })
            .catch(r => {
                self.$mensaje({
                    message:"Ocurrió un error",
                    type:"error"
                });

            });
        }
      }); 
    }
   
  }
};
</script>