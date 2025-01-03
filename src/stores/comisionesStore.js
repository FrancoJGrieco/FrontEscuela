import { create } from 'zustand'
import axios from 'axios'

const comisionesStore = create((set) => ({
  comisiones: null,
  cursos: null,
  alumnos: null,
  alumnoSeleccionado: null,
  cursoSeleccionado: null,
  createFormVisibility: false,
  materiasVisibility: false,
  alumnosVisibility: false,
  updateFormVisibility: false,

  createForm: {
    numero: '',
    year: ''
  },
  updateForm: {
    _id: null,
    numero: '',
    year: '',
    materias: [],
    alumnos: []
  },

  fetchComisiones: async () => {
    const res = await axios.get('http://localhost:3030/comisiones', { withCredentials: true })

    set({
      comisiones: res.data.comisiones
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

  createComision: async (e) => {
    e.preventDefault()

    const { createForm, comisiones, cursoSeleccionado, vaciarCreateForm } = comisionesStore.getState()
    const { numero, year } = createForm

    const resGet = await axios.get('http://localhost:3030/cursos/' + cursoSeleccionado, { withCredentials: true })

    const materias = resGet.data.curso.materias.filter((materia) => materia.year === year)

    console.log(materias)

    const res = await axios.post('http://localhost:3030/comisiones', { numero, year, materias }, { withCredentials: true })

    vaciarCreateForm()
    set({
      comisiones: [...comisiones, res.data.comision],
      createFormVisibility: false
    })
  },

  deleteComision: async (_id) => {
    const { comisiones } = comisionesStore.getState()
    await axios.delete('http://localhost:3030/comisiones/' + _id, { withCredentials: true })

    const newComisiones = [...comisiones].filter((comision) => {
      return comision._id !== _id
    })

    set({
      comisiones: newComisiones
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

  handleCursoSeleccionado: (e) => {
    const { value } = e.target
    set((state) => {
      return {
        cursoSeleccionado: value
      }
    })
  },

  handleAlumnoSeleccionado: (e) => {
    const { value } = e.target
    set((state) => {
      return {
        alumnoSeleccionado: value
      }
    })
  },

  updateComision: async (e) => {
    e.preventDefault()

    const { updateForm, comisiones, vaciarUpdateForm, cursoSeleccionado, cerrarForm } = comisionesStore.getState()
    const { numero, year, alumnos } = updateForm
    let { materias } = updateForm

    if (cursoSeleccionado) {
      const resCursos = await axios.get('http://localhost:3030/cursos/' + cursoSeleccionado)
      materias = resCursos.data.curso.materias.filter((materia) => materia.year === updateForm.year)
    }

    const res = await axios.put('http://localhost:3030/comisiones/' + updateForm._id, { numero, year, materias, alumnos }, { withCredentials: true })

    const newComisiones = [...comisiones]
    const comisionIndex = comisiones.findIndex((comision) => {
      return comision._id === updateForm._id
    })
    newComisiones[comisionIndex] = res.data.comision
    vaciarUpdateForm()
    cerrarForm()
    set({
      comisiones: newComisiones
    })
  },

  toggleUpdate: (comision) => {
    const { cerrarForm, vaciarCreateForm } = comisionesStore.getState()
    cerrarForm()
    vaciarCreateForm()
    set({
      updateForm: {
        _id: comision._id,
        numero: comision.numero,
        year: comision.year
      },
      updateFormVisibility: true
    })
  },

  toggleCreate: async () => {
    const { createFormVisibility } = comisionesStore.getState()

    const res = await axios.get('http://localhost:3030/cursos', { withCredentials: true })
    const { cerrarForm, vaciarUpdateForm } = comisionesStore.getState()
    cerrarForm()
    vaciarUpdateForm()
    set({
      cursos: res.data.cursos,
      createFormVisibility: !createFormVisibility
    })
  },

  verMaterias: (comision) => {
    const { _id, numero, year, materias } = comision
    const { cerrarForm } = comisionesStore.getState()
    cerrarForm()
    set({
      updateForm: {
        _id,
        numero,
        year,
        materias
      },
      materiasVisibility: true
    })
  },

  verAlumnos: async (comision) => {
    const { cerrarForm, updateForm } = comisionesStore.getState()
    const resAlumnos = await axios.get('http://localhost:3030/alumnos', { withCredentials: true })
    cerrarForm()
    set({
      updateForm: {
        _id: comision._id,
        numero: comision.numero,
        year: comision.year,
        alumnos: comision.alumnos
      },
      alumnosVisibility: true,
      alumnos: resAlumnos
    })

    console.log(updateForm)
  },

  agregarAlumno: async (e) => {
    e.preventDefault()

    const { updateForm, alumnoSeleccionado, comisiones, vaciarUpdateForm, cerrarForm } = comisionesStore.getState()
    const { numero, year, materias, alumnos } = updateForm

    alumnos.push(alumnoSeleccionado)

    console.log(updateForm._id)
    console.log(alumnos)
    console.log(alumnoSeleccionado)

    const res = await axios.put('http://localhost:3030/comisiones/' + updateForm._id, { numero, year, materias, alumnos })

    console.log(res.data)
    const newComisiones = [...comisiones]
    const comisionIndex = comisiones.findIndex((comision) => {
      return comision._id === updateForm._id
    })
    newComisiones[comisionIndex] = res.data.comision
    vaciarUpdateForm()
    cerrarForm()
    set({
      comisiones: newComisiones
    })
  },

  cerrarForm: () => {
    set({
      createFormVisibility: false,
      updateFormVisibility: false,
      materiasVisibility: false,
      alumnosVisibility: false,
      cursoSeleccionado: null
    })
  },

  vaciarUpdateForm: () => {
    set({
      updateForm: {
        _id: null,
        numero: '',
        year: '',
        materias: []
      }
    })
  },

  vaciarCreateForm: () => {
    set({
      updateForm: {
        numero: '',
        year: ''
      }
    })
  }

}))

export default comisionesStore
