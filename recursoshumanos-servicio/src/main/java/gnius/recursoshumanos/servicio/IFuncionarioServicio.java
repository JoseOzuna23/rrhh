package gnius.recursoshumanos.servicio;

import gnius.recursoshumanos.modelo.Funcionario;

import java.util.List;

public interface IFuncionarioServicio {
    /**
     * Obtiene una lista de todos los funcionarios registrados.
     *
    
     */
    List<Funcionario> listarFuncionarios();
     /**
     * Busca un funcionario por su identificador único.
     *
     
     */
    

    Funcionario buscarFuncionarioPorId(Integer idFuncionario);  /**
    * Guarda o actualiza un funcionario en el sistema.
    *
    
    */

    Funcionario guardarFuncionario(Funcionario funcionario);

    /**
     * Elimina un funcionario del sistema.
     *
    
     */

    void eliminarFuncionario(Funcionario funcionario);
}
