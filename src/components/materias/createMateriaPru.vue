<template>
<div>
<h2>Crear Materia</h2>
  <el-form ref="Rulesform" v-loading="loading" label-width="200px" label-position='center' :model="form" :rules="rules">

      <el-form-item label="Descripción De la Materia" prop="descripcion">
        <el-input v-model="form.descripcion" ></el-input>
      </el-form-item>
      <el-form-item label="Creditos">
         <el-select v-model="form.credito"  placeholder="Seleccionar La cantidad de creditos"> 
            <el-option value="5"></el-option>
            <el-option value="4"></el-option>
            <el-option value="3"></el-option>
            <el-option value="2"></el-option>
         </el-select> 
      </el-form-item>
  
      <el-form-item label="Precio" prop="precio">
        <el-input v-model="form.precio" ></el-input>
      </el-form-item>
    
      
      <el-form-item label="Estatus">
         <el-select v-model="form.estatus"  placeholder="Seleccionar un estatus"> 
            <el-option value="A"></el-option>
            <el-option value="I"></el-option>
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
  name: "materiaCreate",
  data() {
    return {
      loading:false,
      form:{
        IDmateria:0,
        descripcion:null,
        credito:null,
        precio:null,
        estatus:null
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
   
    
  },
  methods: {
    
    getPorID(IDmateria){
      if(IDmateria ==undefined) return;
      // console.log(IDmateria)
      let self = this; 
          self.loading = true;
           self.$store.state.services.materiaService
          
            .getPorID(IDmateria)
            .then(r => {
              console.log(r.data[0])
              self.loading = false;
              self.form.IDmateria = r.data[0].IDmateria,
              self.form.descripcion = r.data[0].descripcion,
              self.form.credito = r.data[0].credito,
              self.form.precio = r.data[0].precio,
              self.form.estatus = r.data[0].estatus
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

           if(self.form.IDmateria > 0){
             //.log('hola')
             
            console.log(self.form);
             self.$store.state.services.materiaService
            .updateMateria(this.form)
            .then(r => {
              self.loading = false;
              self.$router.push('/materias/');
            })
            .catch(r => {
                self.$mensaje({
                    message:"Ocurrió un error",
                    type:"error"
                });

            });

           }else{
            console.log(self.form); 
             self.$store.state.services.materiaService
            .add(self.form)
            .then(r => {
              self.loading = false;
              self.$router.push('/materias/');
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