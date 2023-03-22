import { Component } from "react";
import { variables } from "../Variables";

export class Clients extends Component {
    
    constructor(props){
        super(props);
        

        this.state={
            clients:[],
            modalTitle:"",
            id_client:0,
            full_name:"",
            phone:"",
            adress:""
        }
    }

    refreshList(){
        fetch(variables.API_URL+'/clients')
        .then(response => response.json())
        .then(data => {
            this.setState({clients:data})
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    changeFullName =(e)=>{
        this.setState({full_name:e.target.value});
    }

    changePhone =(e)=>{
        this.setState({phone:e.target.value});
    }

    changeAdress =(e)=>{
        this.setState({adress:e.target.value});
    }

    addClick(){
        this.setState({
            modalTitle:"Добавить клиента",
            id_client:0,
            full_name:"",
            phone:"",
            adress:""
        })
    }

    editClick(clt){
        this.setState({
            modalTitle:"Редактировать",
            id_client:clt.id_client,
            full_name:clt.full_name,
            phone:clt.phone,
            adress:clt.adress,
        })
    }

    createClick(){
        fetch(variables.API_URL+'/clients',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                id_client:this.state.id_client,
                full_name:this.state.full_name,
                phone:this.state.phone,
                adress:this.state.adress,
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
        fetch(variables.API_URL+'/clients',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                id_client:this.state.id_client,
                full_name:this.state.full_name,
                phone:this.state.phone,
                adress:this.state.adress,
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
        if (window.confirm('Удалить?')){
            fetch(variables.API_URL+'/clients/'+id,{
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
            clients,
            modalTitle,
            id_client,
            full_name,
            phone,
            adress,
        } = this.state;
        console.log(clients)
        return ( 
            <div className="col py-3">
                <div className="container">
                    <button type="button" className="btn btn-primary m-2 float-end" data-bs-toggle="modal" data-bs-target="#exampleModal"
                    onClick={()=>this.addClick()}>Добавить клиента</button>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Имя</th>
                                <th scope="col">Телефон</th>
                                <th scope="col">Адрес</th>
                                <th scope="col">Опции</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clients.map(clt => 
                                <tr key={clt.id_client}>
                                    <td>{clt.full_name}</td>
                                    <td>{clt.phone}</td>
                                    <td>{clt.adress}</td>
                                    <td>
                                        <button type="button" className="btn btn-light mr-1" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>this.editClick(clt)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fillRule="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                        </svg>
                                        </button>
                                        <button type="button" className="btn btn-light mr-1" onClick={
                                            ()=>this.deleteClick(clt.id_client)
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
                                        <span className="input-group-text">Имя</span>
                                        <input type="text" className="form-control" value={full_name} onChange={this.changeFullName}/>
                                        <span className="input-group-text">Телефон</span>
                                        <input type="text" className="form-control" value={phone} onChange={this.changePhone}/>
                                        <span className="input-group-text">Адрес</span>
                                        <input type="text" className="form-control" value={adress} onChange={this.changeAdress}/>
                                    </div>
                                </div>

                                {id_client==0?
                                <button type="button" className="btn btn-primary float-start" onClick={
                                    ()=>this.createClick()
                                }>
                                Создать
                                </button>:null}

                                {id_client!=0?
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
 
export default Clients;