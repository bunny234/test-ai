import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import ApexCharts from 'apexcharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';

interface ChartProps {
  // Define props here
}

const Chart: React.FC<ChartProps> = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => {
      console.log('connected');
      setLoading(false);
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setData((prevData) => [...prevData, message]);

      if (message.type === 'entry' || message.type === 'exit') {
        ApexCharts.exec('realtime', 'addPointAnnotation', {
          x: new Date(message.x).getTime(),
          y: message.y,
          label: {
            borderColor: message.type === 'entry' ? '#2563EB' : '#10B981',
            style: {
              color: '#fff',
              background: message.type === 'entry' ? '#2563EB' : '#10B981',
            },
            text: message.type === 'entry' ? 'Buy' : 'Sell',
          }
        })
      }

      ApexCharts.exec('realtime', 'updateSeries', [{
        data: data
      }])
    };

    ws.onclose = () => {
      console.log('disconnected');
    };

    return () => {
      ws.close();
    };
  }, [data]);

  const options = {
    chart: {
      id: 'realtime',
      height: 350,
      type: 'line' as const,
      animations: {
        enabled: true,
        easing: 'linear' as const,
        dynamicAnimation: {
          speed: 1000
        }
      },
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth' as const
    },
    title: {
      text: 'Live Price Data',
      align: 'left' as const
    },
    markers: {
      size: 0
    },
    xaxis: {
      type: 'datetime' as const,
      range: 60000,
    },
    yaxis: {
      max: 100
    },
    legend: {
      show: false
    },
    theme: {
      mode: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
      palette: 'palette1',
      monochrome: {
        enabled: true,
        color: '#2563EB',
        shadeTo: 'light',
        shadeIntensity: 0.65
      },
    }
  };

  const series = [{
    data: data
  }];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Real-Time Chart</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-[350px] w-full" />
        ) : (
          <ReactApexChart options={options} series={series} type="line" height={350} />
        )}
      </CardContent>
    </Card>
  );
};

export default Chart;
