import { create } from 'zustand'
import axios from 'axios'

const alumnosStore = create((set) => ({
  alumnos: null,
  createFormVisibility: false,

  createForm: {
    nombre: '',
    apellido: '',
    edad: ''
  },
  updateForm: {
    _id: null,
    nombre: '',
    apellido: '',
    edad: ''
  },

  fetchAlumnos: async () => {
    const res = await axios.get('http://localhost:3030/alumnos', { withCredentials: true })

    set({
      alumnos: res.data.alumnos
    })
  },

  updateCreateFormField: (e) => {
    const { name, value } = e.target
    set((state) => {
      return {
        createForm: {
          ...state.createForm,
          [name]: value
        }
      }
    })
  },
  createAlumno: async (e) => {
    e.preventDefault()

    const { createForm, alumnos } = alumnosStore.getState()
    const res = await axios.post('http://localhost:3030/alumnos', createForm, { withCredentials: true })

    set({
      alumnos: [...alumnos, res.data.alumno],
      createForm: {
        nombre: '',
        apellido: '',
        edad: ''
      },
      createFormVisibility: false
    })
  },
  deleteAlumno: async (_id) => {
    const { alumnos } = alumnosStore.getState()
    await axios.delete('http://localhost:3030/alumnos/' + _id, { withCredentials: true })

    const newAlumnos = [...alumnos].filter((alumno) => {
      return alumno._id !== _id
    })

    set({
      alumnos: newAlumnos
    })
  },
  handleUpdateFieldChange: (e) => {
    const { name, value } = e.target
    set((state) => {
      return {
        updateForm: {
          ...state.updateForm,
          [name]: value
        }
      }
    })
  },
  updateAlumno: async (e) => {
    e.preventDefault()

    const { updateForm, alumnos } = alumnosStore.getState()
    const { nombre, apellido, edad } = updateForm

    const res = await axios.put('http://localhost:3030/alumnos/' + updateForm._id, { nombre, apellido, edad }, { withCredentials: true })

    const newAlumnos = [...alumnos]
    const alumnoIndex = alumnos.findIndex((alumno) => {
      return alumno._id === updateForm._id
    })
    newAlumnos[alumnoIndex] = res.data.alumno

    set({
      alumnos: newAlumnos,
      updateForm: {
        _id: null,
        nombre: '',
        apellido: '',
        edad: ''
      }
    })
  },
  toggleUpdate: (alumno) => {
    set({
      createFormVisibility: false,
      createForm: {
        nombre: '',
        apellido: '',
        edad: ''
      },
      updateForm: {
        _id: alumno._id,
        nombre: alumno.nombre,
        apellido: alumno.apellido,
        edad: alumno.edad
      }
    })
  },
  toggleCreate: () => {
    const { createFormVisibility } = alumnosStore.getState()
    set({
      createFormVisibility: !createFormVisibility,
      updateForm: {
        _id: null,
        nombre: '',
        apellido: '',
        edad: 0
      }
    })
  }

}))

export default alumnosStore
