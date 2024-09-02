import axios from "axios";
import React, { useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import { Botones, LinkTO} from '../util/Boton'

export default function EditarFuncionario() {
    let navegacion = useNavigate();
    const urlBase = "http://localhost:8085/api/funcionarios";

     // Hook para obtener el parámetro 'id' de la URL

    const { id } = useParams();

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
        await axios.put(`${urlBase}/${id}`, funcionario);
        navegacion('/');
    };

     // Efecto para cargar los datos del funcionario cuando el componente se monta o cuando cambia el 'id'

    useEffect(() => {
        cargarFuncionario(id);
    }, [id]);


     // Función para cargar los datos del funcionario desde el servidor
    const cargarFuncionario = async (id) => {
        const resultado = await axios.get(`${urlBase}/${id}`);
        setFuncionario(resultado.data);
    };

    return (
        <div className="container">
            <div className="container text-center" style={{ margin: "30px" }}>
                <h3>Editar Funcionario</h3>
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
                    <Botones >Guardar</Botones>
                    <LinkTO >Regresar</LinkTO>
                </div>
            </form>
        </div>
    );
}
