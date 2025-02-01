import { Button, Menu, TextField } from '@mui/material'

export default function SearchMenu(props) {

  const { anchorEl, handleClose, open } = props
  return (
    <Menu
      id="search-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
    >
      <TextField name='id' label='ID' variant='standard' size='small' margin='dense' onChange={console.log('a')} value={'a'} />

      <Button>Enviar</Button>
    </Menu>
  )
}
