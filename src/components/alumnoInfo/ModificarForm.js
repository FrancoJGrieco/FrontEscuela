import alumnosInfoStore from '../../stores/alumnoInfoStore'
import BtnExit from '../general/BtnExit'
import ModalWindow from '../general/ModalWindow'

// falta eliminar la nota

export default function ModificarForm () {
  const store = alumnosInfoStore()
  return <>
    {store.updateFormVisibility &&
      <ModalWindow>
        <BtnExit funcion={store.btnClose}></BtnExit>
        <h2>{store.materia.materia.nombre}</h2>
        <h3>Notas</h3>
        {store.materia &&
          <>
            {store.notass.map((nota, index) => {
              return <>
                <input type='number' value={nota} key={index} placeholder='1-10' name={index} onChange={store.handleUpdateFieldChange} />
              </>
            }
            )}
          </>
        }
        <input type='button' value='Modificar' onClick={() => store.updateNotas(store.materia, store.boletin)} />
      </ModalWindow>
    }
  </>
}
