import { create } from 'zustand'
import axios from 'axios'

const alumnosInfoStore = create((set) => ({
  alumno: null,
  notaFormVisibility: false,
  updateFormVisibility: false,
  materia: null,
  nota: null,
  notass: [],

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

  handleUpdateFieldChange: (e) => {
    const { name, value } = e.target
    const { notass } = alumnosInfoStore.getState()
    set({
      notass: notass.map((nota, index) =>
        index === parseInt(name) ? value : nota
      )
    })
  },

  updateNotas: async (materia, boletinId) => {
    const { notass, alumno } = alumnosInfoStore.getState()

    const res = await axios.put('http://localhost:3030/materias_boletin/' + materia._id, { notas: notass })

    const newAlumno = alumno
    const boletinIndex = newAlumno.boletines.findIndex((boletin) => {
      return boletin._id === boletinId
    })

    const materiaIndex = newAlumno.boletines[boletinIndex].materias.findIndex((materiaInd) => {
      return materiaInd._id === materia._id
    })

    newAlumno.boletines[boletinIndex].materias[materiaIndex] = res.data.materiaBoletin

    set({
      alumno: newAlumno
    })
  },

  agregarNota: async () => {
    const { nota, materia } = alumnosInfoStore.getState()

    materia.notas.push(nota)
    const notas = materia.notas

    const res = await axios.put('http://localhost:3030/materias_boletin/' + materia._id, { notas })

    set({
      materia: res.data.materia,
      notaFormVisibility: false
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
      materia,
      notass: materia.notas
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
