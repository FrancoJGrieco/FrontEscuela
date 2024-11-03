export default function InputLabel ({ titulo, onChangeFuncion, valueForm, nameForm }) {
  return (
    <>
      <label>{titulo}</label>
      <input onChange={onChangeFuncion} value={valueForm} name={nameForm} /><br />
    </>
  )
}
