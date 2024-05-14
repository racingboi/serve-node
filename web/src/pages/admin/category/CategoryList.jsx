import { Container, Grid, Stack, Typography } from "@mui/material";
import CategoryTable from "./category";
import SubCategoryTable from "./subcategory";

export default function CategoryList() {
  return (
    <Container sx={{ py: 3 }}>
      <Stack direction="row" justifyContent="center" py="10px">
            <Typography variant="h4">List</Typography>
          </Stack>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
          <CategoryTable />
            </Grid>
            <Grid item xs={12} sm={6}>
          <SubCategoryTable />
            </Grid>
          </Grid>
    </Container>
  );
}
