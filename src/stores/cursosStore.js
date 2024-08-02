import { create } from 'zustand'
import axios from 'axios'

const cursosStore = create((set) => ({
  cursos: null,
  createFormVisibility: false,
  updateFormVisibility: false,
  materiasVisibility: false,
  materiaSeleccionada: null,

  createForm: {
    titulatura: '',
    years: ''
  },
  updateForm: {
    _id: null,
    titulatura: '',
    years: '',
    materias: []
  },

  fetchCursos: async () => {
    const res = await axios.get('http://localhost:3030/cursos', { withCredentials: true })

    set({
      cursos: res.data.cursos
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
  handleMateriaSeleccionada: (e) => {
    const { value } = e.target
    set((state) => {
      return {
        materiaSeleccionada: value
      }
    })
  },
  createCurso: async (e) => {
    e.preventDefault()

    const { createForm, cursos } = cursosStore.getState()
    const res = await axios.post('http://localhost:3030/cursos', createForm, { withCredentials: true })

    set({
      cursos: [...cursos, res.data.curso],
      createForm: {
        titulatura: '',
        years: '',
        materias: []
      },
      createFormVisibility: false
    })
  },
  deleteCurso: async (_id) => {
    const { cursos } = cursosStore.getState()
    await axios.delete('http://localhost:3030/cursos/' + _id, { withCredentials: true })

    const newCursos = [...cursos].filter((curso) => {
      return curso._id !== _id
    })

    set({
      cursos: newCursos
    })
  },
  updateCurso: async (e) => {
    e.preventDefault()

    const { updateForm, cursos, materiaSeleccionada, materiasVisibility } = cursosStore.getState()
    const { titulatura, years, materias } = updateForm

    if (materiaSeleccionada) materias.push(materiaSeleccionada)

    const res = await axios.put('http://localhost:3030/cursos/' + updateForm._id, { titulatura, years, materias }, { withCredentials: true })

    const newCursos = [...cursos]
    const cursoIndex = cursos.findIndex((curso) => {
      return curso._id === updateForm._id
    })
    newCursos[cursoIndex] = res.data.curso

    if (!materiasVisibility) {
      set({
        updateForm: {
          _id: null,
          titulatura: '',
          years: '',
          materias: []
        }
      })
    } else {
      set({
        updateForm: {
          _id: updateForm._id,
          titulatura,
          years,
          materias: res.data.curso.materias
        }
      })
    }
    set({
      cursos: newCursos,
      materiaSeleccionada: null,
      updateFormVisibility: false
    })
  },
  eliminarMateria: async (e, materia) => {
    e.preventDefault()
    const { updateForm, cursos } = cursosStore.getState()
    const { titulatura, years, materias } = updateForm

    materias.splice(materias.indexOf(materia), 1)

    const res = await axios.put('http://localhost:3030/cursos/' + updateForm._id, { titulatura, years, materias }, { withCredentials: true })

    const newCursos = [...cursos]
    const cursoIndex = cursos.findIndex((curso) => {
      return curso._id === updateForm._id
    })
    newCursos[cursoIndex] = res.data.curso

    set({
      updateForm: {
        _id: updateForm._id,
        titulatura,
        years,
        materias: res.data.curso.materias
      }
    })
  },

  toggleUpdate: (curso) => {
    set({
      createFormVisibility: false,
      materiasVisibility: false,
      createForm: {
        titulatura: '',
        years: ''
      },
      updateForm: {
        _id: curso._id,
        titulatura: curso.titulatura,
        years: curso.years
      },
      updateFormVisibility: true
    })
  },
  toggleCreate: () => {
    set({
      createFormVisibility: true,
      updateFormVisibility: false,
      materiasVisibility: false,
      updateForm: {
        _id: null,
        titulatura: '',
        years: ''
      }
    })
  },
  verMaterias: (curso) => {
    set({
      createFormVisibility: false,
      updateFormVisibility: false,
      materiasVisibility: true,
      updateForm: {
        _id: curso._id,
        titulatura: curso.titulatura,
        years: curso.years,
        materias: curso.materias
      }
    })
  },

  cerrarForm: () => {
    set({
      createFormVisibility: false,
      updateFormVisibility: false,
      materiasVisibility: false
    })
  }

}))

export default cursosStore
