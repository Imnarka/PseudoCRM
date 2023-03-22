
import {Bar, Doughnut} from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { Component } from "react";
import { variables } from "../Variables";

export class MostSelling extends Component {
    
    constructor(props){
        super(props);
        

        this.state={
            mostSellingProduc:[]
        }
    }

    async refreshList(){
        await fetch(variables.API_URL+'/orders/mostselling')
        .then(response => response.json())
        .then(data => {
            this.setState({mostSellingProduc:data})
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    render() {
        const {
            mostSellingProduc,
        } = this.state;
        console.log(mostSellingProduc)

        const data = {
            labels: mostSellingProduc.map(product => product.name),
            datasets: [{ 
                label:'сделок',
                data: mostSellingProduc.map(product => product.deal_count),
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
                <div className='col-sm-8 mr-8 text-center' style={{ height:'350px',width:'350px'}}>
                    Кол-во сделок по товарам
                    <Doughnut data={data} options={{ 
                        plugins: {
                            title: {
                                display: true,
                                responsive:true,
                                animation:{
                                    animateScale: true,
                                }
                            }
                        } 
                    }} />
                </div>                 
        )
    }  
}
 
export default MostSelling;