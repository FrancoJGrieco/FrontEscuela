export default function ModalWindow ({ children }) {
  return (
    <div className='container-modal'>
      <div className='content-modal'>
        {children}
      </div>
    </div>
  )
}
