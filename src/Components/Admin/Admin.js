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
  PieSeries,
  ValueAxis,
  Tooltip,
  Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { PieChart, Series, Label, Connector, Tooltip as Toltip } from 'devextreme-react/pie-chart';

import { EventTracker, Animation } from '@devexpress/dx-react-chart';
import Loader from '../Loader';
import ProductsService from '../../Services/ProductsService';

const Admin = () => {

  const [loading, setLoading] = useState(false)
  const [chartData, setChartData] = useState([])
  const [pieChartData, setPieChartData] = useState([])
  const [targetItem, setTargetItem] = useState(undefined)
  const [targetPieItem, setTargetPieItem] = useState(undefined)


  const customizeText = (pointInfo) => {
    return pointInfo.value;
  }

  const onPointClick = (e) => {
    const point = e.target;
    if (point.isSelected()) {
      point.clearSelection();
    } else {
      point.select();
    }
  }
  

  const loadChart = async () => {
    
    setLoading(true)
    const res = await OrdersService.getMonthly();
    setChartData([...res.data.map((value)=> {
      value.month = value.month.toString()
      return value
   })])
   const response = await ProductsService.countCategories();
    console.log(response.data.map((value)=> {
      value.id = value.id.toString()
      return value
   }))
   setPieChartData([...response.data.map((val)=> {
    //value.id = value.id.toString()
    val.categories = val.categories.categoryName
    return val
  })])
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
              <Grid item xs={6}>
                <Paper>
                <PieChart
                  dataSource={pieChartData}
                  type="doughnut"
                  title="Ilość produktów danej kategorii"
                  onPointClick={onPointClick}
                >
                  <Series 
                    valueField="id"
                    argumentField="categories"
                  >
                    <Label 
                      visible={true}
                      position="columns"
                      customizeText={customizeText}
                    >
                      <Connector visible={true}></Connector>
                    </Label>
                  </Series>
                  <Toltip
                    enabled={true}
                  >
                  </Toltip>
                </PieChart>
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