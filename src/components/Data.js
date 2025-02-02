import { TableCell } from "@mui/material"

export default function Data(props) {
  const { data, keys } = props
  return (
    <>
      {data &&
        <>
        {keys.map((x)=>
        <TableCell>{data[x]}</TableCell>
        )}
        </>
      }
    </>
  )
}