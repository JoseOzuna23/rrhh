package gnius.recursoshumanos.controlador;

import gnius.recursoshumanos.modelo.Funcionario;
import gnius.recursoshumanos.modelo.RegistroEntradaSalida;
import gnius.recursoshumanos.servicio.IRegistroEntradaSalidaServicio;
import gnius.recursoshumanos.servicio.IFuncionarioServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/registros")
@CrossOrigin(value = "http://localhost:3000") // Permite solicitudes CORS desde http://localhost:3000 ( front-end)
public class RegistroEntradaSalidaControlador {

   // Inyecta el servicio para manejar registros de entrada y salida   
    @Autowired
    private IRegistroEntradaSalidaServicio registroEntradaSalidaServicio;

// Inyecta el servicio para manejar funcionarios
    @Autowired
    private IFuncionarioServicio funcionarioServicio;

    // Endpoint para listar todos los registros de entrada y salida

    @GetMapping
    public List<RegistroEntradaSalida> listarRegistros() {
        return registroEntradaSalidaServicio.listarRegistros();
    }
    // Endpoint para obtener un registro específico por ID
    @GetMapping("/{id}")
    public ResponseEntity<RegistroEntradaSalida> obtenerRegistroPorId(@PathVariable Integer id) {
        RegistroEntradaSalida registro = registroEntradaSalidaServicio.buscarRegistroPorId(id);
        return ResponseEntity.ok(registro);
    }
// Endpoint para registrar un nuevo registro de entrada y salida
    @PostMapping
    public ResponseEntity<RegistroEntradaSalida> registrarEntradaSalida(@RequestBody RegistroEntradaSalida registro) {
        RegistroEntradaSalida nuevoRegistro = registroEntradaSalidaServicio.guardarRegistro(registro);
        return ResponseEntity.ok(nuevoRegistro);
    }
// Endpoint para actualizar un registro existente por ID
    @PutMapping("/{id}")
    public ResponseEntity<RegistroEntradaSalida> actualizarRegistro(@PathVariable Integer id, @RequestBody RegistroEntradaSalida detallesRegistro) {
        RegistroEntradaSalida registro = registroEntradaSalidaServicio.buscarRegistroPorId(id);
        registro.setFecha(detallesRegistro.getFecha());
        registro.setHoraEntrada(detallesRegistro.getHoraEntrada());
        registro.setHoraSalida(detallesRegistro.getHoraSalida());

        RegistroEntradaSalida registroActualizado = registroEntradaSalidaServicio.guardarRegistro(registro);
        return ResponseEntity.ok(registroActualizado);
    }
// Endpoint para eliminar un registro por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarRegistro(@PathVariable Integer id) {
        RegistroEntradaSalida registro = registroEntradaSalidaServicio.buscarRegistroPorId(id);
        registroEntradaSalidaServicio.eliminarRegistro(registro);
        return ResponseEntity.noContent().build();
    }

    // Nuevo método para obtener registros por funcionario y rango de fechas
  @GetMapping("/funcionario/{idFuncionario}")
public ResponseEntity<List<RegistroEntradaSalida>> obtenerRegistrosPorFuncionarioYFechas(
        @PathVariable Integer idFuncionario,
        @RequestParam("fechaInicio") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaInicio,
        @RequestParam("fechaFin") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaFin) {
    
    // Validar fechas
    if (fechaInicio.isAfter(fechaFin)) {
        return ResponseEntity.badRequest().body(null); // Retornar error si la fecha de inicio es posterior a la fecha de fin
    }

    Funcionario funcionario = funcionarioServicio.buscarFuncionarioPorId(idFuncionario);
    if (funcionario == null) {
        return ResponseEntity.notFound().build();
    }
    
    List<RegistroEntradaSalida> registros = registroEntradaSalidaServicio.obtenerRegistrosPorFuncionarioYFechas(funcionario, fechaInicio, fechaFin);
    
    return ResponseEntity.ok(registros);
}


}
