
import {Bar, Pie} from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { Component } from "react";
import { variables } from "../Variables";

export class MostBiggetEmployees extends Component {
    
    constructor(props){
        super(props);
        

        this.state={
            clients:[]
        }
    }

    async refreshList(){
        await fetch(variables.API_URL+'/orders/MostBiggestEmployees')
        .then(response => response.json())
        .then(data => {
            this.setState({clients:data})
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    render() {
        const {
            clients,
        } = this.state;
        console.log(clients)

        const data = {
            labels: clients.map(client => client.full_name),
            datasets: [{ 
                label:'Сумма заказов',
                data: clients.map(client => client.sum),
                fill: false, 
                backgroundColor:[
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ]
            }]
        }

        return ( 
                <div className='col-sm-8 mr-8 text-center'>
                    "Большие" клиенты
                    <Bar data={data} options={{ 
                        title: { 
                            display: true, 
                            text: '"Большие" клиенты',
                            fontSize: 15
                        }, 
                        legend: {
                            display: true,
                            position: "top"
                            } 
                    }} />
                </div>                 
        )
    }  
}
 
export default MostBiggetEmployees;