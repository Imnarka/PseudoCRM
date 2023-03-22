import { Component } from "react";
import { variables } from "../Variables";

export class Product extends Component {
    
    constructor(props){
        super(props);
        

        this.state={
            products:[],
            modalTitle:"",
            ProductID:0,
            name:"",
            description:"",
            price:0.00,
            total:0,
            manufacture:""
        }
    }

    refreshList(){
        fetch(variables.API_URL+'/product')
        .then(response => response.json())
        .then(data => {
            this.setState({products:data})
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    changeProductName =(e)=>{
        this.setState({name:e.target.value});
    }

    changeDescription =(e)=>{
        this.setState({description:e.target.value});
    }

    changePrice =(e)=>{
        this.setState({price:e.target.value});
    }

    changeTotal =(e)=>{
        this.setState({total:e.target.value});
    }

    changeManufacture =(e)=>{
        this.setState({manufacture:e.target.value});
    }

    addClick(){
        this.setState({
            modalTitle:"Добавить продукт",
            productid:0,
            name:""
        })
    }

    editClick(prod){
        this.setState({
            modalTitle:"Редактировать",
            ProductID:prod.ProductID,
            name:prod.name,
            description:prod.description,
            price:prod.price,
            total:prod.total,
            manufacture:prod.manufacture
        })
    }

    createClick(){
        fetch(variables.API_URL+'/product',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                productID:this.state.productid,
                productName:this.state.name,
                productDescription:this.state.description,
                price:this.state.price,
                total:this.state.total,
                manufacture:this.state.manufacture
            })
        })
        .then(res=>res.json())
        .then(result=>{
            alert(result);
            this.refreshList();
        },(errot)=>{
            alert('Failed')
        })
    }

    updateClick(){
        fetch(variables.API_URL+'/product',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                productID:this.state.productid,
                productName:this.state.name,
                productDescription:this.state.description,
                price:this.state.price,
                total:this.state.total,
                manufacture:this.state.manufacture
            })
        })
        .then(res=>res.json())
        .then(result=>{
            alert(result);
            this.refreshList();
        },(errot)=>{
            alert('Failed')
        })
    }

    deleteClick(id){
        if (window.confirm('Удалить этот продукт?')){
            fetch(variables.API_URL+'/product/'+id,{
                method:'DELETE',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
            .then(res=>res.json())
            .then(result=>{
                alert(result);
                this.refreshList();
            },(errot)=>{
                alert('Failed')
            })
        }
    }

    render() {
        const {
            products,
            modalTitle,
            productid,
            name,
            description,
            price,
            total,
            manufacture
        } = this.state;
        console.log(products)
        return ( 
            <div className="col py-3">
                <div className="container">
                    <button type="button" className="btn btn-primary m-2 float-end" data-bs-toggle="modal" data-bs-target="#exampleModal"
                    onClick={()=>this.addClick()}>Добавить продукт</button>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Название</th>
                                <th scope="col">Описание</th>
                                <th scope="col">Цена</th>
                                <th scope="col">Кол-во</th>
                                <th scope="col">Производитель</th>
                                <th scope="col">Опции</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(prod => 
                                <tr key={prod.productid}>
                                    <td>{prod.productid}</td>
                                    <td>{prod.name}</td>
                                    <td>{prod.description}</td>
                                    <td>{prod.price}</td>
                                    <td>{prod.total}</td>
                                    <td>{prod.manufacture}</td>
                                    <td>
                                        <button type="button" className="btn btn-light mr-1" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>this.editClick(prod)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fillRule="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                        </svg>
                                        </button>
                                        <button type="button" className="btn btn-light mr-1" onClick={
                                            ()=>this.deleteClick(prod.productid)
                                        }>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fillRule="currentColor" className="bi bi-trash2" viewBox="0 0 16 16">
                                        <path d="M14 3a.702.702 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671L2.037 3.225A.703.703 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2zM3.215 4.207l1.493 8.957a1 1 0 0 0 .986.836h4.612a1 1 0 0 0 .986-.836l1.493-8.957C11.69 4.689 9.954 5 8 5c-1.954 0-3.69-.311-4.785-.793z"/>
                                        </svg>
                                        </button>
                                    </td>
                                </tr>)}
                        </tbody>
                    </table>
                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                        <div className="modal-dialog modal-lg modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">{modalTitle}</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Название</span>
                                        <input type="text" className="form-control" value={name} onChange={this.changeProductName}/>
                                        <span className="input-group-text">Описание</span>
                                        <input type="text" className="form-control" value={description} onChange={this.changeDescription}/>
                                        <span className="input-group-text">Цена</span>
                                        <input type="text" className="form-control" value={price} onChange={this.changePrice}/>
                                        <span className="input-group-text">Кол-во</span>
                                        <input type="text" className="form-control" value={total} onChange={this.changeTotal}/>
                                        <span className="input-group-text">Производитель</span>
                                        <input type="text" className="form-control" value={manufacture} onChange={this.changeManufacture}/>
                                    </div>
                                </div>

                                {productid==0?
                                <button type="button" className="btn btn-primary float-start" onClick={
                                    ()=>this.createClick()
                                }>
                                Создать
                                </button>:null}

                                {productid!=0?
                                <button type="button" className="btn btn-primary" onClick={
                                    ()=>this.updateClick()
                                }>
                                Редактировать
                                </button>:null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }  
}
 
export default Product;