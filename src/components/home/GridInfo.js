import { Card, CardContent, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2"

export default function GridInfo({title, data}) {
  return (
    <Grid xs={12} md={3}>
      <Card>
        <CardContent>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="h4">{data}</Typography>
        </CardContent>
      </Card>
    </Grid>
  )
}