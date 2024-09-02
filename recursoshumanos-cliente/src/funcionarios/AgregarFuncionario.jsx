import axios from "axios";
import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";
import { Botones, LinkTO} from '../util/Boton'
import '../estilos/estilo.css'

export default function AgregarFuncionario() {
    let navegacion = useNavigate();

     // Estado para manejar los datos del funcionario

    const [funcionario, setFuncionario] = useState({
        nombre: "",
        apellido: "",
        cedula: "",
        fechaNacimiento: ""
    });
// Desestructuración de los datos del funcionario
    const { nombre, apellido, cedula, fechaNacimiento } = funcionario;

      // Función para manejar cambios en los inputs del formulario
    const onInputChange = (evento) => {
        setFuncionario({ ...funcionario, [evento.target.name]: evento.target.value });
    };
  // Función para manejar el envío del formulario
    const onSubmit = async (evento) => {
        evento.preventDefault();
        const urlBase = "http://localhost:8085/api/funcionarios";
        await axios.post(urlBase, funcionario);
        navegacion('/');
    };

    return (
        <div className="container p-5">
            <div className="container text-center" style={{ margin: "30px" }}>
                <h3>Agregar Funcionario</h3>
            </div>
            <form onSubmit={(evento) => onSubmit(evento)}>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nombre"
                        name="nombre"
                        required={true}
                        value={nombre}
                        onChange={(evento) => onInputChange(evento)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="apellido" className="form-label">Apellido</label>
                    <input
                        type="text"
                        className="form-control"
                        id="apellido"
                        name="apellido"
                        required={true}
                        value={apellido}
                        onChange={(evento) => onInputChange(evento)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="cedula" className="form-label">Cédula</label>
                    <input
                        type="text"
                        className="form-control"
                        id="cedula"
                        name="cedula"
                        required={true}
                        value={cedula}
                        onChange={(evento) => onInputChange(evento)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="fechaNacimiento" className="form-label">Fecha de Nacimiento</label>
                    <input
                        type="date"
                        className="form-control"
                        id="fechaNacimiento"
                        name="fechaNacimiento"
                        required={true}
                        value={fechaNacimiento}
                        onChange={(evento) => onInputChange(evento)}
                    />
                </div>
                <div className="text-center">
                    <Botones >Agregar</Botones>
                    <LinkTO >Regresar</LinkTO>
                </div>
            </form>
        </div>
    );
}
