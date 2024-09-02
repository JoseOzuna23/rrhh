package gnius.recursoshumanos.servicio;

import gnius.recursoshumanos.modelo.Funcionario;
import gnius.recursoshumanos.modelo.RegistroEntradaSalida;

import java.time.LocalDate;
import java.util.List;

public interface IRegistroEntradaSalidaServicio {

    // Obtiene una lista de todos los registros de entrada y salida registrados.

    List<RegistroEntradaSalida> listarRegistros();

    // Busca un registro de entrada y salida por su identificador único.
    RegistroEntradaSalida buscarRegistroPorId(Integer idRegistro);
    
    // Guarda o actualiza un registro de entrada y salida en el sistema..

    RegistroEntradaSalida guardarRegistro(RegistroEntradaSalida registro);

    //Elimina un registro de entrada y salida del sistema.

    void eliminarRegistro(RegistroEntradaSalida registro);
    // Obtiene una lista de registros de entrada y salida para un funcionario específico dentro de un rango de fechas.

    List<RegistroEntradaSalida> obtenerRegistrosPorFuncionarioYFechas(Funcionario funcionario, LocalDate fechaInicio,
            LocalDate fechaFin);
}
