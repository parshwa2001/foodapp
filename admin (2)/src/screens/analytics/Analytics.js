import React from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const Analytics = () => {
  const options = {
    chart: {
      type: 'line'
    },
    title: {
      text: 'Monthly User Register'
    },
    subtitle: {
      text: ''
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yAxis: {
      title: {
        text: 'Temperature (°C)'
      }
    },
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true
        },
        enableMouseTracking: false
      }
    },
    series: [{
      name: 'Users',
      data: [10, 35, 18, 20, 25, 45, 25, 44, 35, 25, 70, 10]
    }]
  }
  return (
    <>
      <h2 className='medium_font'>User Analytics</h2>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    </>
  )
}

export default Analytics;