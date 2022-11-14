import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import OrdersService from '../../Services/OrdersService';
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
  Tooltip,
} from '@devexpress/dx-react-chart-material-ui';
import { EventTracker } from '@devexpress/dx-react-chart';
import Loader from '../Loader';

const Admin = () => {

  const [loading, setLoading] = useState(false)
  const [chartData, setChartData] = useState([])
  const [targetItem, setTargetItem] = useState(undefined)

  const loadChart = async () => {
    
    setLoading(true)
    const res = await OrdersService.getMonthly();
    setChartData([...res.data.map((value)=> {
      value.month = value.month.toString()
      return value
   })])
    console.log(res.data)
    setLoading(false)
  }


  useEffect(() => { 
    loadChart()
  }, [])

  if(loading) {
    return <Loader/>
  }

  return (
    <Box
            component="main"
            sx={{
              flexGrow: 1,
              height: '100vh',
            }}
          >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={3}>
                {/* Chart */}
                <Grid item xs={12} md={8} lg={9}>

                </Grid>
                {/* Recent Deposits */}
                <Grid item xs={12} md={4} lg={3}>
                <Paper>
                    <Chart
                      data={chartData}
                    >
                      <ArgumentAxis />
                      <ValueAxis />

                      <BarSeries
                        valueField="year"
                        argumentField="population"
                      />
                      <Title
                        text="Sumaryczne ceny zamówień z danych miesięcy"
                      />
                      <EventTracker />
                      <Tooltip/>
                    </Chart>
                  </Paper>
                
                </Grid>
                {/* Recent Orders */}
                <Grid item xs={12}>
                  <Paper>
                    <Chart
                      data={chartData}
                    >
                      <ArgumentAxis />
                      <ValueAxis
                      tickSize={100}
                      />

                      <BarSeries
                        valueField="finalPrice"
                        argumentField="month"
                      />
                      <Title
                        text="Sumaryczne ceny zamówień z danych miesięcy"
                      />
                      <EventTracker />
                      <Tooltip targetItem={targetItem} onTargetItemChange={(targetItem) => setTargetItem(targetItem)}/>
                    </Chart>
                  </Paper>
                </Grid>
              </Grid>
            </Container>
          </Box>
  )
}

export default Admin