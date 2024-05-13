import { Helmet } from 'react-helmet-async';
import Container from '@mui/material/Container';
import {  Card, Stack, Table, TableBody, TableContainer, TablePagination, Typography } from '@mui/material';
import TableNoData from './table/table-no-data';
import UserTableHead from './table/user-table-head';
import {  useEffect, useState } from 'react';
import { applyFilter, emptyRows, getComparator } from './table/utils';
import Scrollbar from '../../../components/scrollbar';
import UserTableRow from './table/user-table-row';
import TableEmptyRows from './table/table-empty-rows';
import UserTableToolbar from './table/user-table-toolbar';
// import { Users } from '../../../_mock/users'; // Ensure this is correctly imported
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers, resetStateCreateAction, resetStateDeleteAction, resetStateUpdateAction } from '../../../redux/slices/usersReducer';
import { handleToast } from '../../../config/ConfigToats';
import AddUser from './add/AddUser';

export default function User() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [Users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const datauser = useSelector((state) => state.users.users);
  const status = useSelector((state) => state.users.status);
  const statusUpdate = useSelector((state) => state.users.statusUpdate);
  const statusCreate = useSelector((state) => state.users.statusCreate);
  const statusDelete = useSelector((state) => state.users.statusDelete);
  const error = useSelector((state) => state.users.error);
  useEffect(() => {
    if (status === 'success') {
      setUsers(datauser.users);
    }
  }, [status, datauser]);
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllUsers());
    }
  }, [dispatch, status]);
  useEffect(() => {
    if (statusUpdate == 'success') {
      handleToast('success', 'cập nhật thành công!');
      dispatch(fetchAllUsers());
      dispatch(resetStateUpdateAction());
    }
    else if (statusUpdate === 'failed')
      handleToast('error', error.message);
  }, [statusUpdate,dispatch,error]);
  useEffect(() => {
    if (statusCreate == 'success') {
      handleToast('success', 'Người dùng được thêm thành công');
      dispatch(fetchAllUsers());
      dispatch(resetStateCreateAction());
    }
    else if (statusCreate === 'failed')
      handleToast('error', error.message);
  }, [statusCreate, dispatch, error]);
  
  useEffect(() => {
    if (statusDelete == 'success') {
      handleToast('success', 'Người dùng đã xóa thành công');
      dispatch(fetchAllUsers());
      dispatch(resetStateDeleteAction());
    }
    else if (statusDelete === 'failed')
      handleToast('error', error.message);
  }, [statusDelete, dispatch, error]);

  const handleSort = (_event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = Users.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: Users || [], // Ensure Users is an array
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;
  return (
    <>
      <Helmet>
        <title>List User</title>
      </Helmet>
      <Container sx={{ py: 3 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4">List Users</Typography>
          <AddUser/>
        </Stack>
        <Card>
          <UserTableToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ overflow: 'unset' }}>
              <Table sx={{ minWidth: 800 }}>
                <UserTableHead
                  order={order}
                  orderBy={orderBy}
                  rowCount={Users.length}
                  numSelected={selected.length}
                  onRequestSort={handleSort}
                  onSelectAllClick={handleSelectAllClick}
                  headLabel={[
                    { id: 'name', label: 'Name' },
                    { id: 'phone', label: 'Phone' },
                    { id: 'email', label: 'Email', align: 'center' },
                    { id: 'status', label: 'Status' },
                    { id: '' },
                  ]}
                />
                <TableBody>
                  {dataFiltered
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <UserTableRow
                        key={row._id}
                        _id={row._id}
                        name={row.name}
                        status={row.isBlocked ? 'banned' : 'Active'}
                        mobile={row.mobile || 'null'}
                        avatarUrl={row.avatarUrl?row.avatarUrl : ''}
                        email={row.email}
                        selected={selected.indexOf(row.name) !== -1}
                        handleClick={(event) => handleClick(event, row.name)}
                      />
                    ))}

                  <TableEmptyRows
                    height={77}
                    emptyRows={emptyRows(page, rowsPerPage, Users.length)}
                  />

                  {notFound && <TableNoData query={filterName} />}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            page={page}
            component="div"
            count={Users.length}
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
