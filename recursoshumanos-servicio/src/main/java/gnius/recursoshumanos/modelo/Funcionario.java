package gnius.recursoshumanos.modelo;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

import java.time.LocalDate;
import java.util.Set;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity // Indica que esta clase es una entidad JPA, mapeada a una tabla en la base de datos
@Data// Genera automáticamente getters, setters, equals(), hashCode(), toString() y un constructor con todos los campos
@NoArgsConstructor// Genera un constructor sin argumentos
@AllArgsConstructor// Genera un constructor con todos los argumentos
@ToString// Genera el método toString() para la clase
public class Funcionario {
    @Id// Indica que este campo es la clave primaria de la entidad
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Configura la generación automática del valor del campo ID (identidad autoincrementable)
    private Integer id;// Identificador único del funcionario

    private String nombre; // Nombre del funcionario
    private String apellido;// Apellido del funcionario
    private String cedula; // Número de cédula o documento de identidad del funcionario
    private LocalDate fechaNacimiento; // Fecha de nacimiento del funcionario
    private Boolean estado = true;   // El estado

     @OneToMany(mappedBy = "funcionario", cascade = CascadeType.ALL, orphanRemoval = true)  // Configurar la eliminación en cascada
    private Set<RegistroEntradaSalida> registrosEntradaSalida;// Conjunto de registros de entrada y salida asociados a este funcionario
    
}
