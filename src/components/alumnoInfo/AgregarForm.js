import alumnosInfoStore from '../../stores/alumnoInfoStore'
import BtnExit from '../general/BtnExit'
import ModalWindow from '../general/ModalWindow'

export default function AgregarForm () {
  const store = alumnosInfoStore()
  return <>
    {store.notaFormVisibility &&
      <ModalWindow>
        <BtnExit funcion={store.btnClose}></BtnExit>
        <h2>Nota</h2>
        <input type='number' placeholder='1-10' name='nota' onChange={store.handleNotaFieldChange} />
        <input type='button' value='Agregar' onClick={() => store.agregarNota()} />
      </ModalWindow>
    }
  </>
}
