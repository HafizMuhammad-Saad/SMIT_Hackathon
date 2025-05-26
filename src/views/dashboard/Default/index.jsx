import { useEffect, useState } from 'react';

// material-ui
import Grid from '@mui/material/Grid2';

// project imports
import TotalEvents from './TotalEventsCard';
import ApprovedEvents from './ApprovedEventsCard';
import PopularCard from './PopularCard';
import TotalOrderLineChartCard from './PendingEventsCard';
import TotalIncomeDarkCard from '../../../ui-component/cards/TotalIncomeDarkCard';
import TotalIncomeLightCard from '../../../ui-component/cards/TotalIncomeLightCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';

import { gridSpacing } from 'store/constant';
import { supabase } from '../../../service/supabase';

// assets
import StorefrontTwoToneIcon from '@mui/icons-material/StorefrontTwoTone';
import { useAuth } from '../../../contexts/AuthContext';
import EarningCard2 from './loanStatuses';
// ==============================|| DEFAULT DASHBOARD ||============================== //

export default function Dashboard() {
  const [isLoading, setLoading] = useState(true);
  const { user, eventsReq } = useAuth();
  const [pendingEv, setPendingEv] = useState(0);
  const [rejAmo, setRejAmo] = useState(0);
  const [totalReq, setTotalReq] = useState(0);

  const pendingEvents = async () => {
    const { data, error } = await supabase
      .from('events_table')
      .select('*')
      .eq('status', 'Pending')

    if (error) throw error;
      if (data) {
        // console.log('Pending events:', data);
        setPendingEv(data.length);
      }
    }
  useEffect(() => {
  pendingEvents();
}, []); // Only runs when eventsReq changes

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid size={12}>
        <Grid container spacing={gridSpacing}>
          <Grid size={{ lg: 4, md: 6, sm: 6, xs: 12 }}>
            <TotalEvents isLoading={isLoading} />
          </Grid>
          <Grid size={{ lg: 4, md: 6, sm: 6, xs: 12 }}>
            <TotalOrderLineChartCard isLoading={isLoading} approvedAmount={pendingEv} />
          </Grid>
          <Grid size={{ lg: 4, md: 6, sm: 6, xs: 12 }}>
            <ApprovedEvents isLoading={isLoading} />
          </Grid>
          {/* <Grid size={{ lg: 4, md: 12, sm: 12, xs: 12 }}>
            <Grid container spacing={gridSpacing}>
              <Grid size={{ sm: 6, xs: 12, md: 6, lg: 12 }}>
                <TotalIncomeDarkCard isLoading={isLoading} approvedAmount={approvedAmo} />
              </Grid>
              <Grid size={{ sm: 6, xs: 12, md: 6, lg: 12 }}>
                <TotalIncomeLightCard
                  {...{
                    isLoading: isLoading,
                    total: rejAmo,
                    label: 'Total Rejected Amount',
                    icon: <StorefrontTwoToneIcon fontSize="inherit" />
                  }}
                />
              </Grid>
            </Grid>
          </Grid> */}
        </Grid>
      </Grid>
      { /*<Grid size={12}>
        <Grid container spacing={gridSpacing}>
          <Grid size={{ xs: 12, md: 8 }}>
             <TotalGrowthBarChart isLoading={isLoading} /> 
            <EarningCard2 isLoading={isLoading} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <PopularCard isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>*/}
    </Grid>
  );
}
