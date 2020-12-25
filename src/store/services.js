import Axios from 'axios'

import exampleService from '../services/ExampleService'
import studentService from '../services/studentService'
import aulaService from '../services/aulaService'
import materiaService from '../services/materiaService'
import horarioService from '../services/horarioService'
import cursoService from '../services/cursoService'

let apiUrl = 'https://localhost:44340/api/'
//let apiUrl = 'http://cuello02-001-site1.itempurl.com/api/'
// Axios Configuration
Axios.defaults.headers.common.Accept = 'application/json'

export default {
    exampleService: new exampleService(Axios),
    studentService: new studentService(Axios,apiUrl),
    aulaService: new aulaService(Axios,apiUrl),
    materiaService: new materiaService(Axios,apiUrl),
    horarioService: new horarioService(Axios,apiUrl),
    cursoService: new cursoService(Axios,apiUrl)
}