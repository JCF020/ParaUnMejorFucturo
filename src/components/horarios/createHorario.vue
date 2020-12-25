<template>
<div>
<h2>Crear Horario</h2>
  <el-form ref="Rulesform" v-loading="loading" label-width="200px" label-position='center' :model="form" :rules="rules">

      <el-form-item label="Descripción Del horario" prop="descripcion">
        <el-input v-model="form.descripcion" ></el-input>
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
  name: "horarioCreate",
  data() {
    return {
      loading:false,
      form:{
        IDhorario:0,
        descripcion:null,
        
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
    
    getPorID(IDhorario){
      if(IDhorario ==undefined) return;
      // console.log(IDhorario)
      let self = this; 
          self.loading = true;
           self.$store.state.services.horarioService
          
            .getPorID(IDhorario)
            .then(r => {
              console.log(r.data[0])
              self.loading = false;
              self.form.IDhorario = r.data[0].IDhorario,
              self.form.descripcion = r.data[0].descripcion
              
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

           if(self.form.IDhorario > 0){
             //.log('hola')
             
            console.log(self.form);
             self.$store.state.services.horarioService
            .updateHorario(this.form)
            .then(r => {
              self.loading = false;
              self.$router.push('/horarios/');
            })
            .catch(r => {
                self.$mensaje({
                    message:"Ocurrió un error",
                    type:"error"
                });

            });

           }else{
            console.log(self.form); 
             self.$store.state.services.horarioService
            .add(self.form)
            .then(r => {
              self.loading = false;
              self.$router.push('/horarios/');
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