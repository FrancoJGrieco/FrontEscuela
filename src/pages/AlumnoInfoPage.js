/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import alumnoInfoStore from '../stores/alumnoInfoStore'
import AgregarForm from '../components/alumnoInfo/AgregarForm'
import ModificarForm from '../components/alumnoInfo/ModificarForm'
import AlumnoInfo from '../components/alumnoInfo/AlumnoInfo'

export default function AlumnoInfoPage () {
  const store = alumnoInfoStore()
  const _id = useParams()

  useEffect(() => {
    store.fetchAlumno(_id._id)
  }, [])

  return <>
    <AlumnoInfo />
    <ModificarForm />
    <AgregarForm />
  </>
}
