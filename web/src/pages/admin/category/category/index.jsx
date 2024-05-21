import { Button, Card, Stack, Table, TableBody, TableContainer, TablePagination, Typography } from "@mui/material";
import CategoryTableHead from "./category-table-head";
import CategoryToolbar from "./category-table-toolbar";
import CategoryTableRow from "./category-table-row";
import TableEmptyRows from "./table-empty-rows";
import TableNoData from "./table-no-data";
import { applyFilter, emptyRows, getComparator } from "../utils";
import { useEffect, useState } from "react";
import Scrollbar from "../../../../components/scrollbar";
import { useDispatch, useSelector } from "react-redux";
import { handleToast } from "../../../../config/ConfigToats";
import { getAll, resetCreateState, resetDeleteState, resetGetCategoryState, resetUpdateState } from "../../../../redux/slices/categoryReducer";
import { Link } from "react-router-dom";
import Iconify from "../../../../components/iconify";

export default function CategoryTable() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [category, setCategory] = useState([]);

  const dispatch = useDispatch();
  const status = useSelector((state) => state.categories.status);
  const categoryData = useSelector((state) => state.categories.data);
  const statusCreate = useSelector((state) => state.categories.createCategory);
  const error = useSelector((state) => state.categories.error);
  const statusUpdate = useSelector((state) => state.categories.updateCategory);
  const statusDelete = useSelector((state) => state.categories.deleteCategory);
  const getCategoryStatus = useSelector((state) => state.categories.getCategory);
  useEffect(() => {
    if (getCategoryStatus === 'failed') {
      handleToast('error', error.message);
    }
    if (getCategoryStatus === 'success') {
      handleToast('success', 'Category fetched successfully');
      dispatch(getAll());
      dispatch(resetGetCategoryState())
    }

  }, [dispatch, getCategoryStatus, error]);
  useEffect(() => {
    if (statusUpdate === 'failed') {
      handleToast('error', error.message);
    }
    if (statusUpdate === 'success') {
      handleToast('success', 'Category updated successfully');
      dispatch(getAll());
      dispatch(resetUpdateState())
    }
  }, [dispatch, error, statusUpdate]);
  useEffect(() => {
    if (statusDelete === 'failed') {
      handleToast('error', error.message);
    }
    if (statusDelete === 'success') {
      handleToast('success', 'Category deleted successfully');
      dispatch(getAll());
      dispatch(resetDeleteState())
    }
  }, [dispatch, error, statusDelete]);
  useEffect(() => {
    if (statusCreate === 'failed') {
      handleToast('error', error.message);
    }
    if (statusCreate === 'success') {
      handleToast('success', 'Category created successfully');
      dispatch(getAll());
      dispatch(resetCreateState())
    }
  }, [statusCreate, error,dispatch]);
  useEffect(() => {
    if (status === 'idle') {
      dispatch(getAll());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (status === 'success') {
      setCategory(categoryData.data);
    } else if (status === 'failed') {
      handleToast('error', 'Failed to load category');
    }
  }, [status, categoryData]);



  const handleSort = (_event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(id);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = category.map((n) => n.name);
      setSelected(newSelecteds);
    } else {
      setSelected([]);
    }
  };

  const handleClick = (_event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: category || [],
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Card>
      <Stack direction="row" justifyContent="space-between" padding="10px">
        <Typography variant="h6">List Category</Typography>
        <Button
          component={Link} to="/dashboard/category/add"
          variant="contained" color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          List Category
        </Button>
      </Stack>
      <CategoryToolbar
        numSelected={selected.length}
        filterName={filterName}
        onFilterName={handleFilterByName}
      />
      <Scrollbar>
        <TableContainer>
          <Table>
            <CategoryTableHead
              order={order}
              orderBy={orderBy}
              rowCount={category.length}
              numSelected={selected.length}
              onRequestSort={handleSort}
              onSelectAllClick={handleSelectAllClick}
              headLabel={[
                { id: 'name', label: 'Name' },
                { id: 'slug', label: 'slug' },
                { id: '', label: '' },
              ]}
            />
            <TableBody>
              {dataFiltered
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  // eslint-disable-next-line react/jsx-key
                  <CategoryTableRow
                    key={row._id}
                    category={row}
                    selected={selected.indexOf(row.name) !== -1}
                    handleClick={(event) => handleClick(event, row.name)}
                  />
                ))}
              <TableEmptyRows
                height={77}
                emptyRows={emptyRows(page, rowsPerPage, category.length)}
              />
              {notFound && <TableNoData query={filterName} />}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>
      {Array.isArray(category) && category.length > 0 && (
        <TablePagination
          page={page}
          component="div"
          count={category.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Card>
  );
}
