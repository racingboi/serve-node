import { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Container,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Typography
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Scrollbar from "../../../components/scrollbar";
import ProductTableHead from "./table/product-table-head";
import ProductTableRow from "./table/product-table-row";
import TableEmptyRows from "./table/table-empty-rows";
import TableNoData from "./table/table-no-data";
import { fetchAllProducts } from "../../../redux/slices/productReducer";
import { handleToast } from "../../../config/ConfigToats";
import { applyFilter, emptyRows, getComparator } from "./utils";
import ProductToolbar from './table/product-table-toolbar';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Iconify from '../../../components/iconify';

export default function List() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [product, setProduct] = useState([]);

  const dispatch = useDispatch();
  const status = useSelector((state) => state.products.status);
  const dataproduct = useSelector((state) => state.products.data);
  const error = useSelector((state) => state.products.error);
  const statusAdd = useSelector((state) => state.products.status);
  const errorAdd = useSelector((state) => state.products.error);

  useEffect(() => {
    if (statusAdd === 'failed') {
      handleToast('error', error.message);
    }
    if (errorAdd === 'success') {
      handleToast('success', 'Product created successfully');
    }
  }, [statusAdd, errorAdd,error]);
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllProducts());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (status === 'success') {
      setProduct(dataproduct.productDatas);
    } else if (status === 'failed') {
      handleToast('error', error);
    }
  }, [dataproduct, status, error]);

  const handleSort = (_event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(id);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = product.map((n) => n.name);
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
    inputData: product || [],
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <>
      <Helmet>
        <title>List Product</title>
      </Helmet>
      <Container sx={{ py: 3 }}>
        <Stack direction="row" justifyContent='space-between' py="10px" >
          <Typography variant="h4">List Product</Typography>
          <Button
            component={Link} to="/dashboard/products/add"
            variant="contained" color="inherit"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Add Product
         </Button>
          </Stack>
        <Card>
          <ProductToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />
          <Scrollbar>
            <TableContainer sx={{ overflow: 'unset' }}>
              <Table sx={{ minWidth: 800 }}>
                <ProductTableHead
                  order={order}
                  orderBy={orderBy}
                  rowCount={product.length}
                  numSelected={selected.length}
                  onRequestSort={handleSort}
                  onSelectAllClick={handleSelectAllClick}
                  headLabel={[
                    { id: 'title', label: 'Name' },
                    { id: 'price', label: 'Price' },
                    { id: 'brand', label: 'Brand' },
                    { id: 'quantity', label: 'Quantity' },
                    { id: 'sold', label: 'Sold' },
                    { id: '', label: '' },
                  ]}
                />
                <TableBody>
                  {dataFiltered
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <ProductTableRow
                        key={row._id}
                        _id={row._id}
                        avatarUrl={row.images[0] || ''}
                        name={row.name}
                        price={row.price}
                        brand={row.brand}
                        quantity={row.quantity}
                        sold={row.sold}
                        selected={selected.indexOf(row.title) !== -1}
                        handleClick={(event) => handleClick(event, row.title)}
                      />
                    ))}
                  <TableEmptyRows
                    height={77}
                    emptyRows={emptyRows(page, rowsPerPage, product.length)}
                  />
                  {notFound && <TableNoData query={filterName} />}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
          <TablePagination
            page={page}
            component="div"
            count={product.length}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[5, 10, 25]}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </>
  );
}
