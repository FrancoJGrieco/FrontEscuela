import { create } from 'zustand'
import axios from 'axios'

const alumnosStore = create((set) => ({
  alumnos: null,
  dni: '',
  pagina: 0,
  listaSize: 2,
  maxPagina: 0,
  alumnosFiltrados: [],
  createFormVisibility: false,
  updateFormVisibility: false,
  pageModalVisibility: false,

  createForm: {
    nombre: '',
    apellido: '',
    edad: '',
    dni: ''
  },
  updateForm: {
    _id: null,
    nombre: '',
    apellido: '',
    edad: '',
    dni: ''
  },

  paginarAlumnos: async () => {
    const { alumnos, listaSize, pagina, maxPagina } = alumnosStore.getState()
    const alumnosPaginados = alumnos.slice(listaSize * pagina, (listaSize * pagina) + listaSize)
    if (pagina < maxPagina && pagina >= 0) {
      set({
        alumnosFiltrados: alumnosPaginados
      })
    }
  },

  nextPage: async () => {
    const { pagina, maxPagina } = alumnosStore.getState()
    if (pagina < maxPagina - 1 && pagina >= 0) {
      set({
        pagina: pagina + 1
      })
    }
  },

  previousPage: async () => {
    const { pagina, maxPagina } = alumnosStore.getState()
    if (pagina < maxPagina && pagina > 0) {
      set({
        pagina: pagina - 1
      })
    }
  },

  goPage: async (valor) => {
    set({
      pagina: valor
    })
  },

  toggleGoPage: async () => {
    set({
      pageModalVisibility: true
    })
  },

  iniciarValores: async () => {
    const { alumnos, listaSize } = alumnosStore.getState()
    const size = alumnos.length
    set({
      maxPagina: size / listaSize
    })
  },

  fetchAlumnos: async () => {
    const res = await axios.get('http://localhost:3030/alumnos', { withCredentials: true })

    set({
      alumnos: res.data.alumnos,
      alumnosFiltrados: res.data.alumnos
    })
  },

  fetchAlumno: async () => {
    const { dni, alumnos } = alumnosStore.getState()

    let filtrados = null
    if (dni) {
      filtrados = alumnos[alumnos.findIndex((alumno) => alumno.dni === dni)]
    } else {
      set({
        alumnosFiltrados: alumnos
      })
    }

    if (filtrados !== null) {
      set({
        alumnosFiltrados: [filtrados]
      })
    }
    console.log(dni)
    console.log(filtrados)
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
  updateSearchField: (e) => {
    const { value } = e.target
    set({
      dni: value
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
    const { nombre, apellido, edad, dni } = updateForm

    const res = await axios.put('http://localhost:3030/alumnos/' + updateForm._id, { nombre, apellido, edad, dni }, { withCredentials: true })

    const newAlumnos = [...alumnos]
    const alumnoIndex = alumnos.findIndex((alumno) => {
      return alumno._id === updateForm._id
    })
    newAlumnos[alumnoIndex] = res.data.alumno

    set({
      alumnos: newAlumnos,
      updateFormVisibility: false,
      updateForm: {
        _id: null,
        nombre: '',
        apellido: '',
        edad: '',
        dni: ''
      }
    })
  },
  toggleUpdate: (alumno) => {
    set({
      createFormVisibility: false,
      updateFormVisibility: true,
      createForm: {
        nombre: '',
        apellido: '',
        edad: '',
        dni: ''
      },
      updateForm: {
        _id: alumno._id,
        nombre: alumno.nombre,
        apellido: alumno.apellido,
        edad: alumno.edad,
        dni: alumno.dni
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
        edad: ''
      }
    })
  },
  btnClose: () => {
    set({
      createFormVisibility: false,
      updateFormVisibility: false,
      updateForm: {
        _id: null,
        nombre: '',
        apellido: '',
        edad: ''
      },
      createForm: {
        nombre: '',
        apellido: '',
        edad: ''
      }
    })
  }

}))

export default alumnosStore
