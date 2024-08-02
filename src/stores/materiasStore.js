import { create } from 'zustand'
import axios from 'axios'

const materiasStore = create((set) => ({
  materias: null,
  createFormVisibility: false,

  createForm: {
    nombre: '',
    descripcion: '',
    year: ''
  },
  updateForm: {
    _id: null,
    nombre: '',
    descripcion: '',
    year: ''
  },

  fetchMaterias: async () => {
    const res = await axios.get('http://localhost:3030/materias', { withCredentials: true })

    set({
      materias: res.data.materias
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
  createMateria: async (e) => {
    e.preventDefault()

    const { createForm, materias } = materiasStore.getState()
    const res = await axios.post('http://localhost:3030/materias', createForm, { withCredentials: true })

    set({
      materias: [...materias, res.data.materia],
      createForm: {
        nombre: '',
        descripcion: '',
        year: ''
      },
      createFormVisibility: false
    })
  },
  deleteMateria: async (_id) => {
    const { materias } = materiasStore.getState()
    await axios.delete('http://localhost:3030/materias/' + _id, { withCredentials: true })

    const newMaterias = [...materias].filter((materia) => {
      return materia._id !== _id
    })

    set({
      materias: newMaterias
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
  updateMateria: async (e) => {
    e.preventDefault()

    const { updateForm, materias } = materiasStore.getState()
    const { nombre, descripcion, year } = updateForm

    const res = await axios.put('http://localhost:3030/materias/' + updateForm._id, { nombre, descripcion, year }, { withCredentials: true })

    const newMaterias = [...materias]
    const materiaIndex = materias.findIndex((materia) => {
      return materia._id === updateForm._id
    })
    newMaterias[materiaIndex] = res.data.materia

    set({
      materias: newMaterias,
      updateForm: {
        _id: null,
        nombre: '',
        descripcion: '',
        year: ''
      }
    })
  },
  toggleUpdate: (materia) => {
    set({
      createFormVisibility: false,
      createForm: {
        nombre: '',
        descripcion: '',
        year: ''
      },
      updateForm: {
        _id: materia._id,
        nombre: materia.nombre,
        descripcion: materia.descripcion,
        year: materia.year
      }
    })
  },
  toggleCreate: () => {
    const { createFormVisibility } = materiasStore.getState()
    set({
      createFormVisibility: !createFormVisibility,
      updateForm: {
        _id: null,
        nombre: '',
        descripcion: '',
        year: ''
      }
    })
  }

}))

export default materiasStore
