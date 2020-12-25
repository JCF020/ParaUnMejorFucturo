<template>
<el-menu default-active="0">
    <template v-for="item, i in items">
        <el-submenu :index="i.toString()" v-if="item.children !== undefined">
            <template slot="title">
                <i :class="'fa fa-' + item.icon"></i>
                <span>{{ item.text }}</span>
            </template>
            <el-menu-item-group title="Opciones">
                <el-menu-item v-for="child, c in item.children" :index="(i.toString() + c)" @click="redirect(child.path)">
                    <i :class="'fa fa-' + child.icon"></i> <span>{{ child.text }}</span>
                </el-menu-item>
            </el-menu-item-group>    
        </el-submenu>
        <el-menu-item index="2" v-if="item.children === undefined" @click="redirect(item.path)">
            <i :class="'fa fa-' + item.icon"></i>
            <span>{{ item.text }}</span>
        </el-menu-item>
    </template>
</el-menu>
</template>

<script>
export default {
  name: "NavegationMenu",
  data: () => ({
    items: [
       //{ icon: "dashboard", text: "Dashboard", path: "/" },
      // {
      //   icon: "star",
      //   text: "Ejemplo",
      //   children: [{ icon: "list", text: "Listar", path: "/example" }]
      // },
      {
        icon: "address-book",
        text: "Aulas",
        children: [
          { icon: "list", text: "Lista De aulas", path: "/aulas" },
          { icon: "plus", text: "Agregar Aula", path: "/aulas/add" }
          ]
      },
       {
        icon: "address-card",
        text: "Cursos",
        children: [
          { icon: "list", text: "Lista De cursos", path: "/cursos" },
          { icon: "plus", text: "Agregar Estudiante en curso", path: "/cursos/add" }
          ]
      },
      {
        icon: "user",
        text: "Estudiantes",
        children: [
          { icon: "list", text: "Lista", path: "/students" },
          { icon: "plus", text: "Agregar", path: "/students/add" }
          ]
      },
       {
        icon: "laptop",
        text: "Materias",
        children: [
          { icon: "list", text: "Lista De Materias", path: "/materias" },
          { icon: "plus", text: "Agregar Materia", path: "/materias/add" }
          ]
      },
      // {
      //   icon: "user",
      //   text: "Login",
      //   children: [
      //     { icon: "list", text: "Login", path: "/login" },
      //     //{ icon: "plus", text: "Agregar", path: "/students/add" }
      //     ]
      // },
      {
        icon: "calendar",
        text: "Horario",
        children: [
          { icon: "list", text: "Lista de horarios", path: "/horarios" },
          { icon: "plus", text: "Agregar horario", path: "/horarios/add" }
        ]
      }
    ]
  }),
  methods: {
    redirect(path) {
      if(path === undefined) return;
      this.$router.push(path);
    }
  }
};
</script>