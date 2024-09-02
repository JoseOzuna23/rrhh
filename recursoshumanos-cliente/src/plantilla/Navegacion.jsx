import React from "react";
import { Link } from "react-router-dom";
import rrhh from '../imagen/logo.png';
import '../estilos/estilo.css'

export default function Navegacion() {
    return (
        <div className="container-fluid m-0 p-0">
            <nav className="navbar navbar-expand-lg navbar-dark p-0 m-0" style={{ background: 'linear-gradient(45deg, #6a11cb 30%, #2575fc 90%)', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                <div className="container-fluid p-0 m-0">
                    <Link className="navbar-brand fw-bold me-auto d-flex align-items-center m-0 p-0" to="/">
                        <img src={rrhh} alt="Logo"  />
                       
                    </Link>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse p-0 m-0 justify-content-end" id="navbarNav">
                        <ul className="navbar-nav p-0 m-0">
                            <li className="nav-item me-3">
                                <Link className="nav-link active" aria-current="page" to="/">
                                    <i className="fas fa-home"></i> Inicio
                                </Link>
                            </li>
                            <li className="nav-item me-3">
                                <Link className="nav-link" to="/agregar">
                                    <i className="fas fa-user-plus"></i> Agregar Funcionario
                                </Link>
                            </li>
                            <li className="nav-item me-3">
                                <Link className="nav-link" to="/registro">
                                    <i className="fas fa-clock"></i> Registrar Entrada/Salida
                                </Link>
                            </li>
                            <li className="nav-item me-3">
                                <Link className="nav-link" to="/reporte">
                                    <i className="fas fa-file-alt"></i> Reporte Entrada/Salida
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}
