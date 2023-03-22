
import {Pie} from 'react-chartjs-2';
import { Component } from "react";
import { variables } from "../Variables";
import MostBiggetEmployees from './MostBiggetEmployees';
import MostSelling from './MostSelling';

export class Dashboard extends Component {
    
    constructor(props){
        super(props);
        

        this.state={
            orders:[]
        }
    }

    refreshList(){
        fetch(variables.API_URL+'/orders/dashboard')
        .then(response => response.json())
        .then(data => {
            this.setState({orders:data})
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    render() {
        const {
            orders,
        } = this.state;
        console.log(orders)

        const data = {
            labels: orders.map(order => order.delivery_adress),
            datasets: [{ 
                label:'Кол-во заказов',
                data: orders.map(order => order.count),
                fill: false, 
                backgroundColor:[
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
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
            <div className="col py-3">
                <div className="container text-center">
                    <div className="row">
                        <h2>Дашборд</h2>
                    </div>
                    <div className='row mt-3'>
                        <div className='col-sm-8 text-center' style={{ height:'300px',width:'300px'}}>
                            Количество заказов по городам
                            <Pie data={data} options={{ 
                                title: { 
                                    display: true, 
                                    text: 'Количество заказов по городам',
                                    fontSize: 15
                                }, 
                                legend: {
                                    display: true,
                                    position: "top"
                                  } 
                            }} />
                        </div>
                        <MostBiggetEmployees />
                    </div>
                    <div className="row mt-3">
                        <MostSelling />
                    </div>
                    {/* <MostBiggetEmployees /> */}
                </div>
            </div>
        )
    }  
}
 
export default Dashboard;