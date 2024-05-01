import React, {useEffect,useRef} from 'react'
import { Chart } from 'chart.js/auto'

export default function PieChart({playerForChart, leaderboardData}) {

    // console.log(playerForChart, leaderboardData);
    const chartRef = useRef (null);
    const chartInstance = useRef (null);

    useEffect(() =>{

        if (chartInstance.current){
            chartInstance.current.destroy()
        }

         const myChartRef = chartRef.current.getContext('2d');

         const leaderboardEntryToChart = leaderboardData.find(x => x.name === playerForChart);
         console.log(leaderboardEntryToChart);
         const wins = leaderboardEntryToChart?.wins ?? 0;
         const losses = leaderboardEntryToChart?.losses ?? 0;

         chartInstance.current = new Chart(myChartRef,{
            type:"pie",
            data: {
                labels: ["Wins","Losts"],
                datasets : [  


                    {
                        data: [wins, losses,],
                        backgroundColor: [
                        'rgb(60, 179, 113)',
                        'rgb(54, 162, 235)',
                        ],
                    }
                ]
            }
         }

         )
         return () =>{
            if(chartInstance.current){
                chartInstance.current.destroy()
            }
         }
    }, [playerForChart]);

    return (
        <div
            className='w-50'
        >
          <canvas 
          ref={chartRef} 
          style={{ width: "auto", height: "auto" }} 
        
          />
        </div>
      );
    }
