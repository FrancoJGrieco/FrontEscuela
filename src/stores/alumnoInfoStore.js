import { create } from 'zustand'
import axios from 'axios'

const alumnosInfoStore = create((set) => ({
  alumno: null,
  notaFormVisibility: false,
  updateFormVisibility: false,
  materia: null,
  nota: null,

  fetchAlumno: async (_id) => {
    const resAlumno = await axios.get('http://localhost:3030/alumnos/' + _id, { withCredentials: true })

    set({
      alumno: resAlumno.data.alumno
    })
  },

  handleNotaFieldChange: (e) => {
    const { name, value } = e.target
    set({
      [name]: value
    })
  },

  agregarNota: async () => {
    const { nota, materia } = alumnosInfoStore.getState()

    materia.notas.push(nota)
    const notas = materia.notas

    const res = await axios.put('http://localhost:3030/materias_boletin/' + materia._id, { notas })

    set({
      materia: res.data.materia
    })
  },

  toggleNota: (materia) => {
    set({
      notaFormVisibility: true,
      materia
    })
  },
  toggleUpdate: (materia) => {
    set({
      updateFormVisibility: true,
      materia
    })
  },
  btnClose: () => {
    set({
      notaFormVisibility: false,
      updateFormVisibility: false
    })
  }

}))

export default alumnosInfoStore
