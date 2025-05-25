import { useEffect, useState } from 'react';

// material-ui
import Grid from '@mui/material/Grid2';

// project imports
import EarningCard from './EarningCard';
import PopularCard from './PopularCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import TotalIncomeDarkCard from '../../../ui-component/cards/TotalIncomeDarkCard';
import TotalIncomeLightCard from '../../../ui-component/cards/TotalIncomeLightCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';

import { gridSpacing } from 'store/constant';

// assets
import StorefrontTwoToneIcon from '@mui/icons-material/StorefrontTwoTone';
import { useAuth } from '../../../contexts/AuthContext';
// import EarningCard2 from './loanStatuses';
// ==============================|| DEFAULT DASHBOARD ||============================== //

export default function Dashboard() {
  const [isLoading, setLoading] = useState(true);
  const { user, eventsReq } = useAuth();
  const [approvedAmo, setApprovedAmo] = useState(0);
  const [rejAmo, setRejAmo] = useState(0);
  const [totalReq, setTotalReq] = useState(0);

  useEffect(() => {
  if (eventsReq) {
    const approved = eventsReq.filter((req) => req.status === 'approved');
    const rejected = eventsReq.filter((req) => req.status === 'rejected');
    const totalRej = rejected.reduce((acc, req) => acc + req.amount, 0);
    setRejAmo(totalRej);
    const totalAmo = approved.reduce((acc, req) => acc + req.amount, 0);
    setApprovedAmo(totalAmo);
    const total = eventsReq.length;
    setTotalReq(total);
  }
}, [eventsReq]); // Only runs when eventsReq changes

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid size={12}>
        <Grid container spacing={gridSpacing}>
          <Grid size={{ lg: 4, md: 6, sm: 6, xs: 12 }}>
            <EarningCard isLoading={isLoading} />
          </Grid>
          <Grid size={{ lg: 4, md: 6, sm: 6, xs: 12 }}>
            <TotalOrderLineChartCard isLoading={isLoading} approvedAmount={totalReq} />
          </Grid>
          <Grid size={{ lg: 4, md: 12, sm: 12, xs: 12 }}>
            <Grid container spacing={gridSpacing}>
              <Grid size={{ sm: 6, xs: 12, md: 6, lg: 12 }}>
                <TotalIncomeDarkCard isLoading={isLoading} approvedAmount={approvedAmo} />
              </Grid>
              <Grid size={{ sm: 6, xs: 12, md: 6, lg: 12 }}>
                <TotalIncomeLightCard
                  {...{
                    isLoading: isLoading,
                    total: rejAmo,
                    label: 'Total Rejected Events',
                    icon: <StorefrontTwoToneIcon fontSize="inherit" />
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid size={12}>
        <Grid container spacing={gridSpacing}>
          <Grid size={{ xs: 12, md: 8 }}>
            <TotalGrowthBarChart isLoading={isLoading} />
            {/* <EarningCard2 isLoading={isLoading} /> */}
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <PopularCard isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
