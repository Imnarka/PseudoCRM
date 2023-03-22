import { Component } from "react";
import { variables } from "../Variables";

export class Orders extends Component {
    
    constructor(props){
        super(props);
        

        this.state={
            orders:[]
        }
    }

    refreshList(){
        fetch(variables.API_URL+'/orders')
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
            modalTitle,
            ProductID,
            name,
            description,
            price,
            total,
            manufacture
        } = this.state;
        console.log(orders)
        return ( 
            <div className="col py-3">
                <div className="container">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Имя клиента</th>
                                <th scope="col">Товар</th>
                                <th scope="col">Адресс доставки</th>
                                <th scope="col">Дата</th>
                                <th scope="col">Сумма</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(prod => 
                                <tr key={prod.id_order}>
                                    <td>{prod.full_name}</td>
                                    <td>{prod.name}</td>
                                    <td>{prod.delivery_adress}</td>
                                    <td>{prod.to_char}</td>
                                    <td>{prod.total}</td>
                                </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }  
}
 
export default Orders;