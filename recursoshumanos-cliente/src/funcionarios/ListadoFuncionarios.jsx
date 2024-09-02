import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../estilos/estilo.css'

export default function ListadoFuncionarios() {
     // URL base del API para obtener la lista de funcionarios
    const urlBase = "http://localhost:8085/api/funcionarios";
       // Estado para almacenar la lista de funcionarios
    const [funcionarios, setFuncionarios] = useState([]);

    // useEffect para cargar los funcionarios cuando el componente se monta

    useEffect(() => {
        cargarFuncionarios();
    }, []);

    // Función para cargar la lista de funcionarios desde el API

    const cargarFuncionarios = async () => {
        const resultado = await axios.get(urlBase);
        setFuncionarios(resultado.data);
    };
 // Función para eliminar un funcionario por su ID
    const eliminarFuncionario = async (id) => {
        await axios.delete(`${urlBase}/${id}`);
        cargarFuncionarios();
    };

    return (
        <div className="container-fluid p-5">
            <div className="container text-center m-4">
                <h3>Listado de Funcionarios</h3>
            </div>
            <table className="table table-custom table-striped">
                <thead className="table-dark ">
                    <tr>                       
                        <th scope="col">Nombres</th>
                        <th scope="col">Apellidos</th>
                        <th scope="col">Cédula</th>
                        <th scope="col">Fecha de Nacimiento</th>                       
                        <th scope="col" className="text-center">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {funcionarios.map((funcionario, indice) => (
                        <tr key={indice} className="table-secondary">                           
                            <td>{funcionario.nombre}</td>
                            <td>{funcionario.apellido}</td>
                            <td>{funcionario.cedula}</td>
                            <td>{new Date(funcionario.fechaNacimiento).toLocaleDateString()}</td>
                            <td className="text-center">
                                <Link to={`/editar/${funcionario.id}`} className="btn btn-warning btn-sm me-3">Editar</Link>
                                <button onClick={() => eliminarFuncionario(funcionario.id)} className="btn btn-danger btn-sm">Eliminar</button>
                            </td>
                            
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
