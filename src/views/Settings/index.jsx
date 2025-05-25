import React from 'react'
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
import { useNavigate } from 'react-router';
import CustomSnackbar from './Snackbar';
import LoanDetailModal from './LoanModal';
// import { useAuth } from '../../../contexts/AuthContext';
import { useAuth } from '../../contexts/AuthContext';
import { useCopilotReadable } from "@copilotkit/react-core"; 
import { DataGrid } from '@mui/x-data-grid';

const User = () => {

    const navigate = useNavigate();
    const { allUsers, admin } = useAuth();
    console.log('allUsers', allUsers, admin);
    

  // const [allUsers, setAllUsers] = useState([]);

    // async function listUsers() {
    //     try {
    //       const { data, error } = await supabase.from('profiles').select('*');
    //       if (error) throw error;
    //       console.log(data);
    //       if (data) {
    //         setAllUsers(data || []);
    //       }
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }

        const columnsUsers = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'first_name',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'last_name',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'email',
    headerName: 'email',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.first_name || ''} ${row.last_name || ''}`,
  },
];

// useEffect(() => {
//     listUsers();
//     }
// , []);

  return (
  
        <MainCard title="Loan Requests">
              <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">All Users</Typography>
              </Box>

      <Box sx={{ height: 500, width: '100%' }}>
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
            </Box>

            <Button onClick={() => navigate(-1)} variant="contained" color="primary" sx={{ mt: 2 }}>
                Go Back
            </Button>
            </MainCard>
   
  )
}

export default User
