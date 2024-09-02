package gnius.recursoshumanos.servicio;

import gnius.recursoshumanos.excepcion.FechaInvalidaExcepcion;
import gnius.recursoshumanos.excepcion.RecursoNoEncontradoExcepcion;
import gnius.recursoshumanos.modelo.Funcionario;
import gnius.recursoshumanos.modelo.RegistroEntradaSalida;
import gnius.recursoshumanos.repositorio.RegistroEntradaSalidaRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class RegistroEntradaSalidaServicio implements IRegistroEntradaSalidaServicio {
    @Autowired
    private RegistroEntradaSalidaRepositorio registroEntradaSalidaRepositorio;
    // Implementación del servicio para la gestión de registros de entrada y salida.

    @Override
    public List<RegistroEntradaSalida> listarRegistros() {
        // Obtiene y retorna todos los registros de entrada y salida almacenados en la
        // base de datos.

        return registroEntradaSalidaRepositorio.findAll();
    }

    @Override
    public RegistroEntradaSalida buscarRegistroPorId(Integer idRegistro) {
        // Busca un registro de entrada y salida por su identificador.
        // Lanza una excepción si el registro no se encuentra.
        return registroEntradaSalidaRepositorio.findById(idRegistro)
                .orElseThrow(() -> new RecursoNoEncontradoExcepcion("Registro no encontrado con id: " + idRegistro));
    }

    @Override
    public RegistroEntradaSalida guardarRegistro(RegistroEntradaSalida registro) {
        // Guarda el registro de entrada y salida en la base de datos.
        // Si el registro ya existe, se actualizará; de lo contrario, se creará uno
        // nuevo.
        return registroEntradaSalidaRepositorio.save(registro);
    }

    @Override
    public void eliminarRegistro(RegistroEntradaSalida registro) {
        // Verifica si el registro existe en la base de datos antes de eliminarlo.
        // Lanza una excepción si el registro no existe.
        if (!registroEntradaSalidaRepositorio.existsById(registro.getId())) {
            throw new RecursoNoEncontradoExcepcion("Registro no encontrado con id: " + registro.getId());
        }
        // Elimina el registro de la base de datos.
        registroEntradaSalidaRepositorio.delete(registro);
    }

    // Método para obtener registros por funcionario y rango de fechas
    @Override
    public List<RegistroEntradaSalida> obtenerRegistrosPorFuncionarioYFechas(Funcionario funcionario,
            LocalDate fechaInicio, LocalDate fechaFin) {
        if (fechaInicio.isAfter(fechaFin)) {
            throw new FechaInvalidaExcepcion("La fecha de inicio no puede ser posterior a la fecha de fin");
        }
        return registroEntradaSalidaRepositorio.findByFuncionarioAndFechaBetween(funcionario, fechaInicio, fechaFin);
    }

}
