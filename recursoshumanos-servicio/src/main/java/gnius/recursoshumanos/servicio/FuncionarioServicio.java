package gnius.recursoshumanos.servicio;

import gnius.recursoshumanos.excepcion.RecursoNoEncontradoExcepcion;
import gnius.recursoshumanos.modelo.Funcionario;
import gnius.recursoshumanos.repositorio.FuncionarioRepositorio;
import gnius.recursoshumanos.repositorio.RegistroEntradaSalidaRepositorio;
import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FuncionarioServicio implements IFuncionarioServicio {
    @Autowired
    private FuncionarioRepositorio funcionarioRepositorio;
    @Autowired
    private RegistroEntradaSalidaRepositorio registroEntradaSalidaRepositorio;



    @Override
    public List<Funcionario> listarFuncionarios() {
        return funcionarioRepositorio.findAll();
    }

    @Override
    public Funcionario buscarFuncionarioPorId(Integer idFuncionario) {
        return funcionarioRepositorio.findById(idFuncionario)
                .orElseThrow(() -> new RecursoNoEncontradoExcepcion("Funcionario no encontrado con id: " + idFuncionario));
    }

    @Override
    public Funcionario guardarFuncionario(Funcionario funcionario) {
        return funcionarioRepositorio.save(funcionario);
    }

    @Transactional
    public void eliminarFuncionario(Funcionario funcionario) {
        // Verificar si el funcionario existe
        if (!funcionarioRepositorio.existsById(funcionario.getId())) {
            throw new RecursoNoEncontradoExcepcion("Funcionario no encontrado con id: " + funcionario.getId());
        }

        // Eliminar los registros relacionados
        registroEntradaSalidaRepositorio.deleteAllByFuncionario(funcionario);

        // Eliminar el funcionario
        funcionarioRepositorio.delete(funcionario);
    }
   
}
