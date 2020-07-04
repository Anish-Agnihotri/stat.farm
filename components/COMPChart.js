import {Line} from 'react-chartjs-2'
import moment from 'moment'

export default function COMPChart(props) {
    let labels = [];
    let chart_data = [];

    for (let i = 0; i < props.data.length; i++) {
        labels.push(moment.utc(props.data[i].time).format('MM/DD'));
        chart_data.push(props.data[i].close);
    }

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'COMP/USD',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                backgroundColor: 'rgba(240,23,22,0.4)',
                borderColor: 'rgba(240,23,22,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(240,23,22,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
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