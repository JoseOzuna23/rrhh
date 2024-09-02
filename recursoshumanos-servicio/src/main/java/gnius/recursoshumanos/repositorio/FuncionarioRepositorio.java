package gnius.recursoshumanos.repositorio;

import gnius.recursoshumanos.modelo.Funcionario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FuncionarioRepositorio extends JpaRepository<Funcionario, Integer> {
    // Los métodos CRUD y otras operaciones de acceso a datos para la entidad Funcionario
    // están proporcionados automáticamente por JpaRepository.
}
