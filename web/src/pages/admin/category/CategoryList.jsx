import { Container, Stack, Typography } from "@mui/material";
import CategoryTable from "./category";

export default function CategoryList() {
  return (
    <Container sx={{ py: 3 }}>
      <Stack direction="row" justifyContent="center" py="10px">
            <Typography variant="h4">List</Typography>
          </Stack>

          <CategoryTable />
  
    </Container>
  );
}
