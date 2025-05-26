// material-ui
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Box,
  Typography,
  Button,
  Snackbar,
  Alert,
  Tooltip,
  Menu,
  MenuList,
  MenuItem,
  ListItemIcon
} from '@mui/material';
import { IconEye } from '@tabler/icons-react';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import { supabase } from '../../service/supabase';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import CustomSnackbar from './Snackbar';
import LoanDetailModal from './LoanModal';
// import { useAuth } from '../../contexts/AuthContext';
import { useAuth } from '../../contexts/AuthContext';
import { useCopilotReadable } from "@copilotkit/react-core";

// import LoanDetail from '/views/loan-detail'

// project imports
// import EarningCard from './EarningCard';
// import PopularCard from './PopularCard';
// import TotalOrderLineChartCard from './TotalOrderLineChartCard';
// import TotalIncomeDarkCard from '../../../ui-component/cards/TotalIncomeDarkCard';
// import TotalIncomeLightCard from '../../../ui-component/cards/TotalIncomeLightCard';
// import TotalGrowthBarChart from './TotalGrowthBarChart';

import { gridSpacing } from 'store/constant';
import { DataGrid } from '@mui/x-data-grid';

// assets
import StorefrontTwoToneIcon from '@mui/icons-material/StorefrontTwoTone';
import { AccessTime, Cancel, CancelOutlined, CheckCircle, CheckCircleOutline, MoreVert, Visibility } from '@mui/icons-material';
import User from './User';

// ==============================|| DEFAULT DASHBOARD ||============================== //

export default function Admin() {
  const [isLoading, setLoading] = useState(true);
  const [allUsers, setAllUsers] = useState([]);
  const [loanReq, setLoanReq] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State for Snackbar open/close

  const [snackbarMessage, setSnackbarMessage] = useState(''); // State for Snackbar message
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // State for Snackbar severity

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null); // To store the loan data for the modal
  const [currentLoadingId, setCurrentLoadingId] = useState(null)

  const { user, admin, setAdmin } = useAuth();


  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'success';
      case 'rejected':
        return 'error';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useCopilotReadable({
    description: "The loan requests data",
    value: loanReq,
  });

  // async function listUsers() {
  //   try {
  //     const { data, error } = await supabase.from('profiles').select('*');
  //     if (error) throw error;
  //     console.log(data);
  //     if (data) {
  //       setAllUsers(data || []);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  async function fetchLoanRequests() {
    try {
      // console.log(user);

      const { data, error } = await supabase.from('events_table').select('*');
      if (error) throw error;
      if (data) {
        setLoanReq(data || []);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const updateStatus = async (id, status, full_name) => {
    const { error } = await supabase.from('events_table').update({ status, full_name }).eq('id', id);

    if (error) {
      console.log(error);
    } else {
      setSnackbarMessage(`Event request ${full_name} status updated to ${status}`);
      setSnackbarSeverity(status === 'approved' ? 'success' : 'error');
      const updatedLoan = loanReq.find((req) => req.id === id);
      if (selectedLoan && selectedLoan.id === id && updatedLoan) {
        setSelectedLoan(updatedLoan); // Update modal content if it's open for this loan
      }
      fetchLoanRequests();
    }
    setSnackbarOpen(true); // Open the snackbar
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'title',
      headerName: 'Title',
      width: 150,
      editable: false
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 150,
      type: Number,
      valueFormatter: (params) => `$${params}`
    },
    {
      field: 'location',
      headerName: 'Location',
      width: 110,
      editable: false
    },
    {
      field: 'created_by',
      headerName: 'Creator',
      width: 110,
      editable: false
    },
    {
      field: 'image_url',
      headerName: 'Image URL',
      width: 110,
      editable: false
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 160,
      renderCell: (params) => {
        const statusColor = getStatusColor(params.value);
        return (
          <Chip
            label={params.value}
            color={statusColor}
            icon={statusColor === 'success' ? <CheckCircleOutline /> : statusColor === 'error' ? <CancelOutlined /> : <AccessTime />}
            variant="filled"
            sx={{
              backgroundColor: `${statusColor}.light`,
              color: `${statusColor}.contrastText`,
              fontWeight: 600,
              textTransform: 'capitalize',
              borderWidth: 2,
              '& .MuiChip-label': {
                px: 1.5
              }
            }}
          />
        );
      },
      sortable: false,
      filterable: true,
      editable: false,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 300, // Increased width to accommodate buttons
      renderCell: (params) => {
        const isProcessing = params.row.id === currentLoadingId;

        return (
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'start',
            gap: 1,
            width: '100%'
          }}>
            {/* View Details Button */}
            <Button
              variant="outlined"
              size="small"
              color="primary"
              startIcon={<IconEye size={20} />}
              onClick={() => handleViewLoan(params.row)}
              disabled={isProcessing}
              sx={{
                textTransform: 'none',
                px: 2,
                '&:hover': { backgroundColor: 'primary.light' }
              }}
            >
              View Details
            </Button>

            {/* Approve Button */}
            <Button
              variant="contained"
              color="success"
              size="small"
              onClick={() => updateStatus(params.row.id, 'approved', params.row.full_name)}
              disabled={isProcessing}
              sx={{
                textTransform: 'none',
                px: 2,
                '&:hover': { backgroundColor: 'success.dark' }
              }}
            >
              Approve
            </Button>

            {/* Reject Button */}
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={() => updateStatus(params.row.id, 'rejected', params.row.full_name)}
              disabled={isProcessing}
              sx={{
                textTransform: 'none',
                px: 2,
                '&:hover': { backgroundColor: 'error.dark' }
              }}
            >
              Reject
            </Button>

            {/* Loading Indicator */}
            {isProcessing && <CircularProgress size={24} sx={{ ml: 1 }} />}
          </Box>
        );
      },
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      headerAlign: 'center',
      align: 'center',
      headerClassName: 'actions-header',
    }
  ];

  //   const columnsUsers = [
  //   { field: 'id', headerName: 'ID', width: 90 },
  //   {
  //     field: 'first_name',
  //     headerName: 'First name',
  //     width: 150,
  //     editable: true,
  //   },
  //   {
  //     field: 'last_name',
  //     headerName: 'Last name',
  //     width: 150,
  //     editable: true,
  //   },
  //   {
  //     field: 'email',
  //     headerName: 'email',
  //     type: 'number',
  //     width: 110,
  //     editable: true,
  //   },
  //   {
  //     field: 'fullName',
  //     headerName: 'Full name',
  //     description: 'This column has a value getter and is not sortable.',
  //     sortable: false,
  //     width: 160,
  //     valueGetter: (value, row) => `${row.first_name || ''} ${row.last_name || ''}`,
  //   },
  // ];

  useEffect(() => {
    fetchLoanRequests();
    //  listUsers();
  }, []);

  //   const handleViewLoan = (loanId) => {
  //     // <customModal />
  //     navigate(`/loan-requests/${loanId}`);
  //   };

  const handleViewLoan = (loan) => {
    setSelectedLoan(loan); // Set the loan data
    setModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedLoan(null); // Clear selected loan data when closing
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  function logOut() {
    setAdmin(false);
    navigate('/login');
  }

  // if (!admin) {
  //   return (
  //     <MainCard title="Unauthorized Access">
  //       <Typography variant="h6">You do not have permission to access this page.</Typography>
  //       <Button
  //         variant="contained"
  //         color="primary"
  //         onClick={() => navigate('/admin')}
  //         sx={{ mt: 2 }}
  //       >
  //         Go to Admin Login
  //       </Button>
  //       <Typography variant="body2" sx={{ mt: 1 }}>
  //         Please log in as an admin to access this page.
  //       </Typography>
  //       <Typography variant="body2" sx={{ mt: 1 }}>
  //         If you are not an admin, please contact your administrator for access.
  //       </Typography>

  //     </MainCard>
  //   );
  // }

  return (
    <MainCard title="Events Requests">
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">All Events Requests</Typography>
      </Box>

      {/* <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Loan Amount</TableCell>
              <TableCell>Purpose</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loanReq.map((request) => (
              <TableRow key={request.id}>
                <TableCell>{request.id.slice(2, 4)}</TableCell>
                <TableCell>{request.full_name}</TableCell>
                <TableCell>${request.amount.toLocaleString()}</TableCell>
                <TableCell>{request.purpose}</TableCell>
                <TableCell>
                  <Chip label={request.status} color={getStatusColor(request.status)} size="small" />
                </TableCell>
                <TableCell>{new Date(request.created_at).toLocaleDateString()}</TableCell>
                <TableCell sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start', gap: 1 }}>
                  <Button
                    variant="outlined" // Or 'contained', 'text' as needed
                    size="small"
                    color="primary"
                    startIcon={<IconEye size={20} />} // Use startIcon prop for the icon
                    onClick={() => handleViewLoan(request)} // Pass the whole request object
                  >
                    View Details
                  </Button>
                  
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    onClick={() => updateStatus(request.id, 'approved', request.full_name)}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => updateStatus(request.id, 'rejected', request.full_name)}
                  >
                    Reject
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}

      <Box sx={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={loanReq}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 7
              }
            }
          }}
          pageSizeOptions={[7]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
      {/* <Box sx={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={allUsers}
          columns={columnsUsers}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 7
              }
            }
          }}
          pageSizeOptions={[7]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box> */}

      {/* <Button onClick={() => navigate('/admin/users')} variant="contained" color="primary" sx={{ mt: 2 }}>
        <StorefrontTwoToneIcon sx={{ ml: 1 }} />
        All Users      </Button> */}




      <Button
        variant="contained"
        color="primary"
        onClick={logOut}
        sx={{ mt: 2 }}
      >
        Log Out
      </Button>

      <CustomSnackbar open={snackbarOpen} message={snackbarMessage} severity={snackbarSeverity} onClose={handleCloseSnackbar} />

      {selectedLoan && ( // Only render the modal component if a loan is selected
        <LoanDetailModal
          open={modalOpen}
          loan={selectedLoan} // Pass the selected loan data
          onClose={handleCloseModal} // Pass the close handler
        />
      )}
    </MainCard>
  );
}

// ==============================|| LOAN REQUESTS PAGE ||============================== //
