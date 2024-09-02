package gnius.recursoshumanos.repositorio;

import gnius.recursoshumanos.modelo.Funcionario;
import gnius.recursoshumanos.modelo.RegistroEntradaSalida;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RegistroEntradaSalidaRepositorio extends JpaRepository<RegistroEntradaSalida, Integer> {
     /**
     * Encuentra todos los registros de entrada y salida para un {@link Funcionario} dado
     * dentro de un rango de fechas específico.
     *
    
     */
    List<RegistroEntradaSalida> findByFuncionarioAndFechaBetween(Funcionario funcionario, LocalDate fechaInicio, LocalDate fechaFin);

      /**
     * Elimina todos los registros de entrada y salida asociados con un {@link Funcionario} dado.
     *
   
     */
    void deleteAllByFuncionario(Funcionario funcionario);
}

