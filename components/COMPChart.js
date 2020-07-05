import {Line} from 'react-chartjs-2' // Chart.js line chart
import moment from 'moment' // Moment to convert time data to readable format

export default function COMPChart(props) {
    let labels = []; // Setup labels array
    let chart_data = []; // Setup COMP/USD data point array

    // Loop through all data
    for (let i = 0; i < props.data.length; i++) {
        labels.push(moment.utc(props.data[i].time).format('MM/DD')); // Push formatted date data
        chart_data.push(props.data[i].close); // Push formatted chart data
    }

    // Chart rendering setup
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'COMP/USD',
                backgroundColor: 'rgba(240,23,22,0.4)',
                borderColor: 'rgba(240,23,22,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(240,23,22,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 0.5,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(240,23,22,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                data: chart_data
            }
        ]
    }

    return (
        <>
            <Line data={data} />
            <style global jsx>{`
            .chartjs-render-monitor {
                width: 100% !important;
                height: 90% !important;
                margin-top: 1.5%;
            }
            `}</style>
        </>
    );
}