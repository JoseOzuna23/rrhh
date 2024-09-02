import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListadoFuncionarios from "./funcionarios/ListadoFuncionarios";
import Navegacion from "./plantilla/Navegacion";
import AgregarFuncionario from "./funcionarios/AgregarFuncionario";
import EditarFuncionario from "./funcionarios/EditarFuncionario";
import AgregarRegistroEntradaSalida from "./entrada/salida/AgregarRegistroEntradaSalida";
import ReporteRegistroEntradaSalida from "./entrada/salida/ReporteRegistroEntradaSalida"; // Importa el nuevo componente de reporte

function App() {
  return (
    <div className="container-fluid">
      <BrowserRouter>
        <Navegacion/>
        <Routes>
          <Route exact path="/" element={<ListadoFuncionarios/>}/>
          <Route exact path="/agregar" element={<AgregarFuncionario/>}/>
          <Route exact path="/editar/:id" element={<EditarFuncionario/>}/>
          <Route exact path="/registro" element={<AgregarRegistroEntradaSalida/>}/>
          <Route exact path="/reporte" element={<ReporteRegistroEntradaSalida/>}/> {/* Nueva ruta para el reporte */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
