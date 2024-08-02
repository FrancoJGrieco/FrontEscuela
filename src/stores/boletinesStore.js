import { create } from 'zustand'
import axios from 'axios'

const boletinesStore = create((set) => ({
  boletines: null,
  updateFormVisibility: false,

  // createForm: {
  //   curso: '',
  //   comision: '',
  //   year: '',
  //   alumno: '',
  //   materias: []
  // },
  updateForm: {
    _id: null,
    curso: '',
    comision: '',
    year: '',
    alumno: '',
    materias: []
  },

  fetchBoletines: async () => {
    const res = await axios.get('http://localhost:3030/boletines', { withCredentials: true })

    set({
      boletines: res.data.boletines
    })
  },

  // updateCreateFormField: (e) => {
  //   const { name, value } = e.target
  //   set((state) => {
  //     return {
  //       createForm: {
  //         ...state.createForm,
  //         [name]: value
  //       }
  //     }
  //   })
  // },
  // createBoletin: async (e) => {
  //   e.preventDefault()

  //   const { createForm, boletines } = boletinesStore.getState()
  //   const res = await axios.post('http://localhost:3030/boletines', createForm, { withCredentials: true })

  //   set({
  //     boletines: [...boletines, res.data.boletin],
  //     createForm: {
  //       curso: '',
  //       comision: '',
  //       year: '',
  //       alumno: '',
  //       materias: []
  //     },
  //     },
  //   })
  // },
  // deleteBoletin: async (_id) => {
  //   const { boletines } = boletinesStore.getState()
  //   await axios.delete('http://localhost:3030/boletines/' + _id, { withCredentials: true })

  //   const newBoletines = [...boletines].filter((boletin) => {
  //     return boletin._id !== _id
  //   })

  //   set({
  //     boletines: newBoletines
  //   })
  // },
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
  updateBoletin: async (e) => {
    e.preventDefault()

    const { updateForm, boletines } = boletinesStore.getState()
    const { curso, comision, year, alumno, materias } = updateForm

    const res = await axios.put('http://localhost:3030/boletines/' + updateForm._id, { curso, comision, year, alumno, materias }, { withCredentials: true })

    const newBoletines = [...boletines]
    const boletinIndex = boletines.findIndex((boletin) => {
      return boletin._id === updateForm._id
    })
    newBoletines[boletinIndex] = res.data.boletin

    set({
      boletines: newBoletines,
      updateForm: {
        _id: null,
        curso: '',
        comision: '',
        year: '',
        alumno: '',
        materias: []
      }
    })
  },
  toggleUpdate: (boletin) => {
    const { _id, curso, comision, year, alumno, materias } = boletin
    set({
      // createForm: {
      //   nombre: '',
      //   apellido: '',
      //   edad: ''
      // },
      updateForm: {
        _id,
        curso,
        comision,
        year,
        alumno,
        materias
      },
      updateFormVisibility: true
    })
  },
  // toggleCreate: () => {
  //   const { createFormVisibility } = boletinesStore.getState()
  //   set({
  //     createFormVisibility: !createFormVisibility,
  //     updateForm: {
  //       _id: null,
  //       nombre: '',
  //       apellido: '',
  //       edad: 0
  //     }
  //   })
  // }
  cerrarForm: () => {
    set({
      updateFormVisibility: false
    })
  }

}))

export default boletinesStore
