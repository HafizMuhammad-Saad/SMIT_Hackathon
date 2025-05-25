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
  Button
} from '@mui/material';
import { IconEye } from '@tabler/icons-react';
import { DataGrid } from '@mui/x-data-grid';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { supabase } from '../../service/supabase';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
import { AccessTime, CheckCircleOutline, CancelOutlined } from '@mui/icons-material';

// ==============================|| LOAN REQUESTS PAGE ||============================== //

const EventRequests = () => {
  // This would typically come from an API

  const { user } = useAuth();

  const [eventReq, setEventReq] = useState([]);

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
      width: 160,
      editable: false,
      renderCell: (params) => (
        <Button
          sx={{
            display: 'flex',
            gap: 1,
            py: 1.9,
            textTransform: 'none',
            color: 'primary.main',
            '&:hover': {
              backgroundColor: 'action.hover'
            }
          }}
          onClick={() => handleViewLoan(params.row.id)}
        >
          <IconEye size={20} />
          View Details
        </Button>
      ),
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      align: 'center',
      headerAlign: 'center'
    }
  ];

  async function fetchEventRequests() {
    try {
      // const {data: {user}} = await supabase.auth.getUser()
      // console.log(user);

      const { data, error } = await supabase.from('events_table').select('*')
      if (error) throw error;
      if (data) {
        setEventReq(data || []);
        console.log('Event requests fetched successfully:', data);
        
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchEventRequests();
  }, []);

  const handleViewLoan = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  return (
    <MainCard title="Event Requests">
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">All Events Requests</Typography>
      </Box>

      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="subtitle1">Total Evnet Requests: {eventReq.length}</Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/add-event/create')}>
          Create New Event Request
        </Button>
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
            {eventReq.map((request) => (
              <TableRow key={request.id}>
                <TableCell>{request.id.slice(2, 4)}</TableCell>
                <TableCell>{request.full_name}</TableCell>
                <TableCell>${request.amount.toLocaleString()}</TableCell>
                <TableCell>{request.purpose}</TableCell>
                <TableCell>
                  <Chip label={request.status} color={getStatusColor(request.status)} size="small" />
                </TableCell>
                <TableCell>{new Date(request.created_at).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button sx={{ display: 'flex', gap: 1 }} onClick={() => handleViewLoan(request.id)}>
                    <IconButton size="small" color="primary">
                      <IconEye size={20} />
                    </IconButton>
                    Veiw Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={eventReq}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5
              }
            }
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </MainCard>
  );
};

export default EventRequests;
