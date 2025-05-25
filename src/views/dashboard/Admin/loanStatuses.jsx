import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid2';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';

// assets
import EarningIcon from 'assets/images/icons/earning.svg';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import GetAppTwoToneIcon from '@mui/icons-material/GetAppOutlined';
import FileCopyTwoToneIcon from '@mui/icons-material/FileCopyOutlined';
import PictureAsPdfTwoToneIcon from '@mui/icons-material/PictureAsPdfOutlined';
import ArchiveTwoToneIcon from '@mui/icons-material/ArchiveOutlined';
import { supabase } from '../../../service/supabase';
import { useAuth } from '../../../contexts/AuthContext';

export default function EarningCard2({ isLoading}) {
 const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    rejected: 0,
    pending: 0,
    totalAmount: 0,
    approvedAmount: 0,
    rejectedAmount: 0,
    pendingAmount: 0
  });
  const { user } = useAuth();

  async function fetchStats() {
    try {
      const { data, error } = await supabase
        .from('loan_requests')
        .select('amount,status')
        .eq('user_id', user.id);

      if (data) {
        let total = data.length;
        let approved = 0, rejected = 0, pending = 0;
        let totalAmount = 0, approvedAmount = 0, rejectedAmount = 0, pendingAmount = 0;

        data.forEach(req => {
          totalAmount += req.amount || 0;
          if (req.status === 'approved') {
            approved++;
            approvedAmount += req.amount || 0;
          } else if (req.status === 'rejected') {
            rejected++;
            rejectedAmount += req.amount || 0;
          } else if (req.status === 'pending') {
            pending++;
            pendingAmount += req.amount || 0;
          }
        });

        setStats({
          total,
          approved,
          rejected,
          pending,
          totalAmount,
          approvedAmount,
          rejectedAmount,
          pendingAmount
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchStats();
    // eslint-disable-next-line
  }, []);

  const theme = useTheme();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {isLoading ? (
        <SkeletonEarningCard />
      ) : (
        <MainCard
          border={false}
          content={false}
          aria-hidden={Boolean(anchorEl)}
          sx={{
            bgcolor: 'secondary.dark',
            color: '#fff',
            overflow: 'hidden',
            position: 'relative',
            '&:after': {
              content: '""',
              position: 'absolute',
              width: 210,
              height: 210,
              background: theme.palette.secondary[800],
              borderRadius: '50%',
              top: { xs: -85 },
              right: { xs: -95 }
            },
            '&:before': {
              content: '""',
              position: 'absolute',
              width: 210,
              height: 210,
              background: theme.palette.secondary[800],
              borderRadius: '50%',
              top: { xs: -125 },
              right: { xs: -15 },
              opacity: 0.5
            }
          }}
        >
          <Box sx={{ p: 2.25 }}>
            <Grid container direction="column">
              <Grid>
                <Grid container sx={{ justifyContent: 'space-between' }}>
                  <Grid>
                    <Avatar
                      variant="rounded"
                      sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.largeAvatar,
                        bgcolor: 'secondary.800',
                        mt: 1
                      }}
                    >
                      <CardMedia sx={{ width: 24, height: 24 }} component="img" src={EarningIcon} alt="Notification" />
                    </Avatar>
                  </Grid>
                  <Grid>
                    <Avatar
                      variant="rounded"
                      sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.mediumAvatar,
                        bgcolor: 'secondary.dark',
                        color: 'secondary.200',
                        zIndex: 1
                      }}
                      aria-controls="menu-earning-card"
                      aria-haspopup="true"
                      onClick={handleClick}
                    >
                      <MoreHorizIcon fontSize="inherit" />
                    </Avatar>
                    <Menu
                      id="menu-earning-card"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                      variant="selectedMenu"
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                      }}
                    >
                      <MenuItem onClick={handleClose}>
                        <GetAppTwoToneIcon sx={{ mr: 1.75 }} /> Import Card
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <FileCopyTwoToneIcon sx={{ mr: 1.75 }} /> Copy Data
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <PictureAsPdfTwoToneIcon sx={{ mr: 1.75 }} /> Export
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <ArchiveTwoToneIcon sx={{ mr: 1.75 }} /> Archive File
                      </MenuItem>
                    </Menu>
                  </Grid>
                </Grid>
              </Grid>
               <Box sx={{ p: 2.25 }}>
            <Grid container direction="column">
              {/* ...existing avatar/menu code... */}
              <Grid>
                <Typography sx={{ fontSize: '1.25rem', fontWeight: 600, mb: 1 }}>
                  Total Requests: {stats.total}
                </Typography>
                <Typography sx={{ fontSize: '1.25rem', fontWeight: 600, mb: 1 }}>
                  Approved: {stats.approved} (${stats.approvedAmount})
                </Typography>
                <Typography sx={{ fontSize: '1.25rem', fontWeight: 600, mb: 1 }}>
                  Pending: {stats.pending} (${stats.pendingAmount})
                </Typography>
                <Typography sx={{ fontSize: '1.25rem', fontWeight: 600, mb: 1 }}>
                  Rejected: {stats.rejected} (${stats.rejectedAmount})
                </Typography>
                <Typography sx={{ fontSize: '1.25rem', fontWeight: 600, mb: 1 }}>
                  Total Amount: ${stats.totalAmount}
                </Typography>
              </Grid>
              {/* ...rest of your card... */}
            </Grid>
          </Box>
            </Grid>
          </Box>
        </MainCard>
      )}
    </>
  );
}

EarningCard2.propTypes = { isLoading: PropTypes.bool };
