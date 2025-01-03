import { create } from 'zustand'
import axios from 'axios'

const comisionesStore = create((set) => ({
  comisiones: null,
  cursos: null,
  alumnos: null,
  materiasBoletin: [],
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
    const { cerrarForm } = comisionesStore.getState()
    const resAlumnos = await axios.get('http://localhost:3030/alumnos', { withCredentials: true })
    cerrarForm()
    set({
      updateForm: {
        _id: comision._id,
        numero: comision.numero,
        year: comision.year,
        materias: comision.materias,
        alumnos: comision.alumnos
      },
      alumnosVisibility: true,
      alumnos: resAlumnos
    })
  },

  agregarAlumno: async (e) => {
    e.preventDefault()

    const { alumnos: alumnoss, updateForm, alumnoSeleccionado, comisiones, vaciarUpdateForm, cerrarForm, materiasBoletin } = comisionesStore.getState()
    const { _id, numero, year, materias, alumnos } = updateForm

    alumnos.push(alumnoSeleccionado)
    console.log(_id)

    const res = await axios.put('http://localhost:3030/comisiones/' + updateForm._id, { numero, year, materias, alumnos })

    try {
      const res = await Promise.all(
        materias.map((materia) =>
          axios.post('http://localhost:3030/materias_boletin', { materia, notas: [] })
        )
      )
      res.forEach(resMateria => {
        materiasBoletin.push(resMateria.data.materiaBoletin._id)
      })
    } catch (err) {
      console.error('Error en una de las solicitudes: ' + err)
    }

    const resBoletin = await axios.post('http://localhost:3030/boletines', { curso: '66463c89ae70832092e2253f', comision: _id, year: '2025', materias: materiasBoletin, alumno: alumnoSeleccionado })

    const alumnoIndex = alumnoss.data.alumnos.findIndex((alumno) => alumno._id === alumnoSeleccionado)

    console.log(resBoletin.data.boletin._id)
    alumnoss.data.alumnos[alumnoIndex].boletines.push(resBoletin.data.boletin._id)

    const resAlumno = await axios.put('http://localhost:3030/alumnos/' + alumnoSeleccionado, { boletines: alumnoss.data.alumnos[alumnoIndex].boletines })

    console.log(resAlumno)

    const newComisiones = [...comisiones]
    const comisionIndex = comisiones.findIndex((comision) => {
      return comision._id === updateForm._id
    })
    newComisiones[comisionIndex] = res.data.comision
    vaciarUpdateForm()
    cerrarForm()
    set({
      comisiones: newComisiones,
      materiasBoletin: []
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
