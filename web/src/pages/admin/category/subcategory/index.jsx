import {  Card, Stack, Table, TableBody, TableContainer, TablePagination, Typography } from "@mui/material";
import TableEmptyRows from "./table-empty-rows";
import TableNoData from "./table-no-data";
import { applyFilter, emptyRows, getComparator } from "../utils";
import { useEffect, useState } from "react";
import Scrollbar from "../../../../components/scrollbar";
import { useDispatch, useSelector } from "react-redux";
import { handleToast } from "../../../../config/ConfigToats";
import { getAll } from "../../../../redux/slices/subcategory";
import SubCategoryTableHead from "./subcategory-table-head";
import SubCategoryTableRow from "./subcategory-table-row";
import SubCategoryToolbar from "./subcategory-table-toolbar";
import AddSubCategory from "./add/Add";
import { resetStateCreate } from "../../../../redux/slices/subcategory";
export default function SubCategoryTable() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [subcategory, setSubCategory] = useState([]);

  const dispatch = useDispatch();
  const status = useSelector((state) => state.subcategories.status);
  const subcategoryData = useSelector((state) => state.subcategories.data);
  const statusCreate = useSelector((state) => state.subcategories.status);
  useEffect(() => {
    if (statusCreate === 'success') {
      handleToast('success', 'Sub Category created successfully');
      dispatch(getAll());
      dispatch(resetStateCreate());
    } else if (statusCreate === 'failed') {
      handleToast('error', 'Failed to create sub category');
    }
  }, [statusCreate, dispatch]);
  useEffect(() => {
    if (status === 'idle') {
      dispatch(getAll());
    }
  }, [dispatch, status]);
  useEffect(() => {
    if (status === 'success') {
      setSubCategory(subcategoryData.Subcategory);
    } else if (status === 'failed') {
      handleToast( 'Error', 'Failed to load category');
    }
  }, [status, subcategoryData, dispatch]);
  const handleSort = (_event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(id);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = subcategory.map((n) => n.name);
      setSelected(newSelecteds);
    } else {
      setSelected([]);
    }
  };

  const handleClick = (event, name) => {
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
    inputData: subcategory || [],
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;
  return (

    <Card>
      <Stack direction="row" justifyContent="space-between" padding="10px">
        <Typography variant="h6">List Sub Category</Typography>
        <AddSubCategory />
      </Stack>
      <SubCategoryToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />
        <Scrollbar>
          <TableContainer>
            <Table>
            <SubCategoryTableHead
                order={order}
                orderBy={orderBy}
              rowCount={subcategory.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id: '', label: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <SubCategoryTableRow
                      key={row._id}
                      _id={row._id}
                      name={row.name}
                      selected={selected.indexOf(row.name) !== -1}
                      handleClick={(event) => handleClick(event, row.name)}
                    />
                  ))}
                <TableEmptyRows
                  height={77}
                emptyRows={emptyRows(page, rowsPerPage, subcategory.length)}
                />
                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
        <TablePagination
          page={page}
          component="div"
        count={subcategory.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
  )
}
