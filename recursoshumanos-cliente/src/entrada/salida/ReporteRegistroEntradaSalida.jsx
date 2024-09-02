import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Botones } from '../../util/Boton'

export default function ReporteRegistroEntradaSalida() {

   // Estados para manejar la lista de funcionarios, los datos del formulario, y los registros
  const [funcionarios, setFuncionarios] = useState([]);
  const [selectedFuncionario, setSelectedFuncionario] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [registros, setRegistros] = useState([]);
  const [selectedFuncionarioNombre, setSelectedFuncionarioNombre] = useState("");
  const [selectedFuncionarioApellido, setSelectedFuncionarioApellido] = useState("");
  const [totalHorasTrabajadas, setTotalHorasTrabajadas] = useState(0);


// Hook de efecto para cargar la lista de funcionarios al montar el componente
  useEffect(() => {
    cargarFuncionarios();
  }, []);
 // Función para cargar la lista de funcionarios desde la API
  const cargarFuncionarios = async () => {
    const resultado = await axios.get("http://localhost:8085/api/funcionarios");
    setFuncionarios(resultado.data);
  };
 // Función para obtener los registros de entrada y salida del funcionario seleccionado
  const obtenerRegistros = async () => {
    const resultado = await axios.get(`http://localhost:8085/api/registros/funcionario/${selectedFuncionario}?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`);

    const registrosData = resultado.data;
    setRegistros(resultado.data);

    // Calcular el total de horas trabajadas
    const totalHoras = registrosData.reduce((total, registro) => total + parseFloat(registro.horasTrabajadas || 0), 0);
    setTotalHorasTrabajadas(totalHoras);
  };

  // Función para manejar el envío del formulario

  const Enviar = (event) => {
    event.preventDefault();
    const funcionario = funcionarios.find(f => f.id === parseInt(selectedFuncionario));
    if (funcionario) {
      setSelectedFuncionarioNombre(funcionario.nombre);
      setSelectedFuncionarioApellido(funcionario.apellido);
    }
    obtenerRegistros();

    // Limpiar los campos después de obtener los registros
    setSelectedFuncionario("");
    setFechaInicio("");
    setFechaFin("");
  };

   // Función para generar el PDF con los registros

  const generarPDF = () => {
    const doc = new jsPDF();

    // Configurar el estilo y tamaño de la fuente
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text(`Reporte de Entrada y Salida - Funcionario: ${selectedFuncionarioNombre} ${selectedFuncionarioApellido}`, 20, 10);

    doc.autoTable({
      head: [["Fecha", "Hora Entrada", "Hora Salida", "Horas Trabajadas"]],
      body: registros.map((registro) => [
        registro.fecha,
        registro.horaEntrada,
        registro.horaSalida,
        registro.horasTrabajadas,
      ]),
      startY: 20,
    });
    // Agregar total de horas trabajadas en el PDF
    doc.text(`Total Horas Trabajadas: ${totalHorasTrabajadas.toFixed(2)}`, 20, doc.lastAutoTable.finalY + 10);


    // Generar el PDF como un Blob
    const pdfBlob = doc.output("blob");

    // Crear una URL para el Blob
    const pdfUrl = URL.createObjectURL(pdfBlob);

    // Abrir el PDF en una nueva pestaña
    window.open(pdfUrl);
    setTimeout(() => {
      window.location.reload();
    }, 1000);

  };

  return (
    <div className="container-fluid p-5">
      <div className="container text-center" style={{ margin: "30px" }}>
        <h3>Reporte de Entrada y Salida</h3>
      </div>

      <h5>  </h5>
      <form onSubmit={Enviar}>
        <div className="mb-3">
          <label htmlFor="funcionario" className="form-label">Funcionario</label>
          <select className="form-select"
            id="funcionario"
            name="funcionario"
            value={selectedFuncionario}
            onChange={(e) =>
              setSelectedFuncionario(e.target.value)} required>
            <option value="">Seleccione un funcionario</option>
            {funcionarios.map((funcionario) => (
              <option key={funcionario.id} value={funcionario.id}>
                {funcionario.nombre} {funcionario.apellido}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="fechaInicio" className="form-label">Fecha Inicio</label>
          <input type="date"
            className="form-control"
            id="fechaInicio"
            value={fechaInicio}
            onChange={(e) =>
              setFechaInicio(e.target.value)}
            required />
        </div>
        <div className="mb-3">
          <label htmlFor="fechaFin" className="form-label">Fecha Fin</label>
          <input type="date"
            className="form-control"
            id="fechaFin" value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            required />
        </div>
        <Botones>Consultar</Botones>
      </form>
      {registros.length > 0 && (
        <>
          <table className="table mt-3">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Hora Entrada</th>
                <th>Hora Salida</th>
                <th>Horas Trabajadas</th>
              </tr>
            </thead>
            <tbody>
              {registros.map((registro) => (
                <tr key={registro.id}>
                  <td>{registro.fecha}</td>
                  <td>{registro.horaEntrada}</td>
                  <td>{registro.horaSalida}</td>
                  <td>{registro.horasTrabajadas}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mb-3">
            <h5>Total Horas Trabajadas: {totalHorasTrabajadas.toFixed(2)}</h5>
          </div>
          <button onClick={generarPDF} className="btn btn-secondary btn-orange boton-css btn-sm me-3">
            Generar PDF
          </button>
        </>

      )}
    </div>
  );
}
