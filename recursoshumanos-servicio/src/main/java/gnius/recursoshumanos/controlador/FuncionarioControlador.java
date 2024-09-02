package gnius.recursoshumanos.controlador;

import gnius.recursoshumanos.modelo.Funcionario;
import gnius.recursoshumanos.servicio.IFuncionarioServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/funcionarios")
@CrossOrigin(value = "http://localhost:3000")  // Permite solicitudes CORS desde http://localhost:3000 (frontend)
public class FuncionarioControlador {

    @Autowired
    private IFuncionarioServicio funcionarioServicio;// Inyecta el servicio de funcionarios

 // Endpoint para listar todos los funcionarios
    @GetMapping
    public List<Funcionario> listarFuncionarios() {
        return funcionarioServicio.listarFuncionarios();
    }
  // Endpoint para obtener un funcionario específico por ID
    @GetMapping("/{id}")
    public ResponseEntity<Funcionario> obtenerFuncionarioPorId(@PathVariable Integer id) {
        Funcionario funcionario = funcionarioServicio.buscarFuncionarioPorId(id);
        return ResponseEntity.ok(funcionario);
    }
// Endpoint para registrar un nuevo funcionario
    @PostMapping
    public ResponseEntity<Funcionario> registrarFuncionario(@RequestBody Funcionario funcionario) {
        Funcionario nuevoFuncionario = funcionarioServicio.guardarFuncionario(funcionario);
        return ResponseEntity.ok(nuevoFuncionario);
    }

      // Endpoint para actualizar los detalles de un funcionario existente

    @PutMapping("/{id}")
    public ResponseEntity<Funcionario> actualizarFuncionario(@PathVariable Integer id, @RequestBody Funcionario detallesFuncionario) {
        Funcionario funcionario = funcionarioServicio.buscarFuncionarioPorId(id);
        funcionario.setNombre(detallesFuncionario.getNombre());
        funcionario.setApellido(detallesFuncionario.getApellido());
        funcionario.setCedula(detallesFuncionario.getCedula());
        funcionario.setFechaNacimiento(detallesFuncionario.getFechaNacimiento());

        Funcionario funcionarioActualizado = funcionarioServicio.guardarFuncionario(funcionario);
        return ResponseEntity.ok(funcionarioActualizado);
    }

    // Endpoint para eliminar un funcionario específico por ID

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarFuncionario(@PathVariable Integer id) {
        Funcionario funcionario = funcionarioServicio.buscarFuncionarioPorId(id);
        funcionarioServicio.eliminarFuncionario(funcionario);
        return ResponseEntity.noContent().build();
    }
}