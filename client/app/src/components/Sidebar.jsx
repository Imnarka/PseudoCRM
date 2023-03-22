import Product from './Product'
import Clients from './Clients';
import Orders from './Orders';
import Dashboard from './Dashboard';
import { Routes, Route } from 'react-router-dom';

const SideBar = () => {
    return ( 
        <div className="row flex-nowrap">
            <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                    <a href="/product" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                        <span className="fs-5 d-none d-sm-inline">CRM</span>
                    </a>
                    <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                    <li className="nav-item">
                        <a href="/dashboard" className="nav-link align-middle px-0">
                            <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline">Домашняя страница</span>
                        </a>
                    </li>
                    <li>
                        <a href="/orders" className="nav-link align-middle px-0 ">
                            <i className="fs-4 bi-table"></i> <span className="ms-1 d-none d-sm-inline">Заказы</span></a>
                    </li>
                    <li>
                        <a href="/Product" className="nav-link align-middle px-0 ">
                            <i className="fs-4 bi-grid"></i> <span className="ms-1 d-none d-sm-inline">Продукты</span> </a>
                    </li>
                    <li>
                        <a href="/clients" className="nav-link px-0 align-middle">
                            <i className="fs-4 bi-people"></i> <span className="ms-1 d-none d-sm-inline">Клиенты</span> </a>
                    </li>
                </ul>
                <hr />
            </div>
        </div>
        <Routes>
            <Route path='/product' element={<Product />} />
            <Route path='/clients' element={<Clients />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
    </div>
    );
}
 
export default SideBar;