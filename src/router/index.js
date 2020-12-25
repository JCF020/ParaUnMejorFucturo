import Vue from 'vue'
import Router from 'vue-router'

import Default from '@/components/Default'
import ExampleIndex from '@/components/example/Index'
import ExampleView from '@/components/example/View'
import StudentIndex from '@/components/estudiantes/index'
import StudentCreate from '@/components/estudiantes/createEstudiante'
import Login from '@/components/login/login'
import AulaIndex from '@/components/aulas/index'
import AulaCreate from '@/components/aulas/createAula'
import MateriaIndex from '@/components/materias/index'
import MateriaCreate from '@/components/materias/createMateriaPru'
import HorarioIndex from '@/components/horarios/index'
import HorarioCreate from '@/components/horarios/createHorario'
import CursoIndex from '@/components/cursos/index'
import CursoCreate from '@/components/cursos/createCurso'


Vue.use(Router)

const routes = [
  { path: '/', name: 'Default', component: StudentIndex },
  { path: '/example', name: 'ExampleIndex', component: ExampleIndex },
  { path: '/example/:id', name: 'ExampleView', component: ExampleView },
  { path: '/students/', name: 'StudentIndex', component: StudentIndex },
  { path: '/students/add', name: 'StudentCreate', component: StudentCreate },
  { path: '/students/:id/edit', name: 'StudentCreate', component: StudentCreate },
  { path: '/aulas/', name: 'AulaIndex', component: AulaIndex },
  { path: '/aulas/add', name: 'AulaCreate', component: AulaCreate },
  { path: '/aulas/:id/edit', name: 'AulaCreate', component: AulaCreate },
  { path: '/materias/', name: 'MateriaIndex', component: MateriaIndex },
  { path: '/materias/add', name: 'MateriaCreate', component: MateriaCreate },
  { path: '/materias/:id/edit', name: 'MateriaCreate', component: MateriaCreate },
  { path: '/horarios/', name: 'HorarioIndex', component: HorarioIndex },
  { path: '/horarios/add', name: 'HorarioCreate', component: HorarioCreate },
  { path: '/horarios/:id/edit', name: 'HorarioCreate', component: HorarioCreate },
  { path: '/cursos/', name: 'CursoIndex', component: CursoIndex },
  { path: '/cursos/add', name: 'CursoCreate', component: CursoCreate },
  { path: '/cursos/:id/edit', name: 'CursoCreate', component: CursoCreate },
  { path: '/login/', name: 'Login', component: Login },
]

export default new Router({
  routes
})
