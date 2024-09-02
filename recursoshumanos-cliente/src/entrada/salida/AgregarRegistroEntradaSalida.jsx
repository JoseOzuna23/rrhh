import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Importa componentes y estilos necesarios
import { Botones, LinkTO} from '../../util/Boton'
import '../../estilos/estilo.css'

export default function AgregarRegistroEntradaSalida() {

    // Hook de navegación para redirigir después de enviar el formulario
    let navegacion = useNavigate();

    // URL base para las APIs
    const urlBase = "http://localhost:8085/api/registros";
    const urlBaseFuncionario = "http://localhost:8085/api/funcionarios";

      // Estado para manejar los datos del registro
    const [registro, setRegistro] = useState({
        funcionario: "",
        fecha: "",
        horaEntrada: "",
        horaSalida: ""
    });

     // Estado para manejar la lista de funcionarios y el funcionario seleccionado

    const [funcionarios, setFuncionarios] = useState([]);
    const [selectedFuncionario, setSelectedFuncionario] = useState(null);

     // Extrae los valores del registro del estado

    const { funcionario, fecha, horaEntrada, horaSalida } = registro;

    // Hook de efecto para cargar la lista de funcionarios al montar el componente

    useEffect(() => {
        cargarFuncionarios();
    }, []);

     // Función para cargar la lista de funcionarios desde la API

    const cargarFuncionarios = async () => {
        const resultado = await axios.get(urlBaseFuncionario);
        setFuncionarios(resultado.data);
    };
  // Función para manejar los cambios en los campos de entrada
    const onInputChange = (evento) => {
        setRegistro({ ...registro, [evento.target.name]: evento.target.value });
    };

      // Función para manejar los cambios en la selección de funcionario

    const onSelectChange = (evento) => {
        const selectedId = evento.target.value;
        setRegistro({ ...registro, funcionario: selectedId });
        const funcionarioSeleccionado = funcionarios.find(f => f.id === parseInt(selectedId));
        setSelectedFuncionario(funcionarioSeleccionado);
    };

      // Función para manejar el envío del formulario

    const onSubmit = async (evento) => {
        evento.preventDefault();
        const registroCompleto = {
            ...registro,
            funcionario: selectedFuncionario 
        };
        await axios.post(urlBase, registroCompleto);
        navegacion('/');
    };

    return (
    
        <div className="container">
            {/*Inicializa el html con un formulario con todos los campos para  agregar los datos con la acciones
            correspondiente en las propiedades de cada campos*/}
            <div className="container text-center" style={{ margin: "30px" }}>
                <h3>Agregar Registro de Entrada y Salida</h3>
            </div>
            <form onSubmit={(evento) => onSubmit(evento)}>
                <div className="mb-3">
                    <label htmlFor="funcionario" className="form-label">Funcionario</label>
                    <select className="form-select" id="funcionario" name="funcionario" value={funcionario} onChange={(evento) => onSelectChange(evento)} required>
                        <option value="">Seleccione un funcionario</option>
                        {funcionarios.map((funcionario) => (
                            <option key={funcionario.id} value={funcionario.id}>
                                {funcionario.nombre} {funcionario.apellido}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="fecha" className="form-label">Fecha</label>
                    <input type="date" className="form-control" id="fecha" name="fecha" required value={fecha} onChange={(evento) => onInputChange(evento)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="horaEntrada" className="form-label">Hora de Entrada</label>
                    <input type="time" className="form-control" id="horaEntrada" name="horaEntrada" required value={horaEntrada} onChange={(evento) => onInputChange(evento)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="horaSalida" className="form-label">Hora de Salida</label>
                    <input type="time" className="form-control" id="horaSalida" name="horaSalida" required value={horaSalida} onChange={(evento) => onInputChange(evento)} />
                </div>
                <div className="text-center">
                    <Botones>Guardar</Botones>
                    <LinkTO> Regresar</LinkTO>
                </div>

            
            </form>
        </div>
    );
}
