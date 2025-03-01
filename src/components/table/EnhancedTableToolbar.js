import { useContext } from "react"
import { FormContext } from "../../hooks/global/forms"
import { FormVisibilityContext } from "../../hooks/global/filters"
import { IconButton, Stack, TextField, Toolbar, Tooltip, Typography } from "@mui/material"
import { alpha } from '@mui/material/styles'
import { Link } from "react-router-dom"
import DeleteIcon from '@mui/icons-material/Delete'
import SettingsIcon from '@mui/icons-material/Settings'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import AddIcon from '@mui/icons-material/Add'
import { useDeleteData } from "../../hooks/useDeleteData"

export function EnhancedTableToolbar(props) {
  const { selected, element, setFilter, filter, tableName, labelSearch, type, setSelected } = props
  const { toggleFormVisibility } = useContext(FormVisibilityContext)
  const { setUpdateForm } = useContext(FormContext)
  const { deleteDB } = useDeleteData()

  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 }
        },
        selected.length > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity)
        }
      ]}
    >
      {selected.length > 0
        ? (
          <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {selected.length} selected
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
              {tableName}
            </Typography>
            <TextField size='small' name='search' label={labelSearch} variant='outlined' value={filter} onChange={(e) => {
              setFilter(e.target.value)
            }}>

            </TextField>
          </Stack>
        )}
      {selected.length > 0
        ? (
          <>
            <Tooltip title="Eliminar">
              <IconButton onClick={() => {
                deleteDB({ typeDB: type, _ids: selected })
                setSelected([])
              }}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            {selected.length > 1 ||
              <>
                <Tooltip title="Modificar" >
                  <IconButton onClick={() => {
                    toggleFormVisibility({ formName: 'update' })
                    setUpdateForm(element)
                  }}>
                    <SettingsIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip
                  title="Mas Información"
                >
                  <IconButton
                    component={Link}
                    to={`/${type}/${element?._id}`}
                    state={{ element: element }}
                    variant='contained'
                  >
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
        )
      }
    </Toolbar >
  )
}