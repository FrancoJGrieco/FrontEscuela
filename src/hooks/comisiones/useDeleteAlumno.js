import axios from "axios"
import { DataContext } from "../global/data";
import { useContext } from "react";

export function useDeleteAlumno() {
  const URL_FETCH_DATA = process.env.REACT_APP_API_URL;

  const { setData } = useContext(DataContext)

  const deleteAlumno = async (element, comision) => {
    try {
      const newAlumnos = comision.alumnos.filter((alumno) => alumno._id !== element._id)
      const updatedComision = { ...comision, alumnos: newAlumnos }

      const currentYear = new Date().getFullYear().toString()
      const boletinToDelete = element.boletines.find(
        (boletin) => boletin.comision._id === comision._id && boletin.year === currentYear
      )

      if (boletinToDelete) {
        await Promise.all(
          boletinToDelete.materias.map((materiaBoletin) =>
            axios.delete(`${URL_FETCH_DATA}materias_boletin/${materiaBoletin._id}`)
          )
        )

        await axios.delete(`${URL_FETCH_DATA}boletines/${boletinToDelete._id}`)

        element.boletines = element.boletines.filter((boletin) => boletin._id !== boletinToDelete._id)

        await axios.put(`${URL_FETCH_DATA}alumnos/${element._id}`, { boletines: element.boletines })
      }

      const res = await axios.put(
        `${URL_FETCH_DATA}comisiones/${comision._id}`,
        { alumnos: newAlumnos, curso: comision.curso, year: comision.year, numero: comision.numero }
      )

      setData((prevState) => ({
        ...prevState,
        comisiones: prevState.comisiones.map((item) =>
          item._id === comision._id ? updatedComision : item
        ),
      }))

      return { success: true, message: "Alumno eliminado correctamente.", comision: res.data.comision }
    } catch (error) {
      console.error("Error al eliminar alumno de la comisión:", error.message)
      return { success: false, message: error.message }
    }
  };

  return { deleteAlumno };
}