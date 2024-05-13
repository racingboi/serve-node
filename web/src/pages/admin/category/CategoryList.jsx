import { Card, CardContent, Container, Grid, Stack, Typography } from "@mui/material";

export default function CategoryList() {
  return (
    <Container sx={{ py: 3 }}>
      <Stack direction="row" justifyContent="center" py="10px">
            <Typography variant="h4">List</Typography>
          </Stack>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Card>
                <CardContent>
              <Typography variant="h5">Category List</Typography>
                
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card>
                <CardContent>
                  <Typography variant="h5">SubCategory List</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
    </Container>
  );
}
