import { useContext } from "react"
import { FormContext } from "../../hooks/global/forms"
import { FormVisibilityContext } from "../../hooks/global/filters"
import { IconButton, Stack, TextField, Toolbar, Tooltip, Typography } from "@mui/material"
import { alpha } from '@mui/material/styles'
import { deleteAllData } from "../../services/deleteAllData"
import { Link } from "react-router-dom"
import PersonRemoveIcon from '@mui/icons-material/PersonRemove'
import SettingsIcon from '@mui/icons-material/Settings'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import AddIcon from '@mui/icons-material/Add'
import PropTypes from "prop-types"

export function EnhancedTableToolbar(props) {
  const { numSelected, alumnos, alumno, setFilter, filter } = props
  const { toggleFormVisibility } = useContext(FormVisibilityContext)
  const { setUpdateForm } = useContext(FormContext)

  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 }
        },
        numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity)
        }
      ]}
    >
      {numSelected > 0
        ? (
          <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        )
        : (
          <Stack
            direction="row"
            spacing={2}
            sx={{
              flex: ' 1 1 100% ',
              justifyContent: "left",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              id="tableTitle"
              component="div"
            >
              Alumnos
            </Typography>
            <TextField size='small' name='search' label='DNI' variant='outlined' value={filter} onChange={(e) => {
              setFilter(e.target.value)
            }}>

            </TextField>
          </Stack>
        )}
      {numSelected > 0
        ? (
          <>
            <Tooltip title="Eliminar">
              <IconButton onClick={() => deleteAllData({ type: 'alumnos', _ids: alumnos })}>
                <PersonRemoveIcon />
              </IconButton>
            </Tooltip>
            {numSelected > 1 ||
              <>
                <Tooltip title="Modificar" >
                  <IconButton onClick={() => {
                    toggleFormVisibility({ formName: 'update' })
                    setUpdateForm(alumno)
                  }}>
                    <SettingsIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip
                  title="Mas Información"
                >
                  <IconButton
                    component={Link}
                    to={'/alumno/' + alumno._id}
                    variant='contained'
                    disableElevation>
                    <MoreHorizIcon />
                  </IconButton>
                </Tooltip>
              </>
            }
          </>
        )
        : (
          <>
            <Tooltip title="Crear">
              <IconButton onClick={() => toggleFormVisibility({ formName: 'create' })}>
                <AddIcon />
              </IconButton>
            </Tooltip>
          </>
        )}
    </Toolbar>
  )
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired
}
