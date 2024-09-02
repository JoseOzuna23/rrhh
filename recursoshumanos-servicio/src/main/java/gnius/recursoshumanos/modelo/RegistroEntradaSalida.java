package gnius.recursoshumanos.modelo;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import java.time.LocalDate;
import java.time.LocalTime;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity // Indica que esta clase es una entidad JPA, mapeada a una tabla en la base de datos
@Data // Genera automáticamente getters, setters, equals(), hashCode(), toString() y un constructor con todos los campos
@NoArgsConstructor// Genera un constructor sin argumentos
@AllArgsConstructor// Genera un constructor con todos los argumentos
@ToString// Genera el método toString() para la clase
public class RegistroEntradaSalida {
    /* Se declara los campo para esta entidad 
      con los campos correspondiente y sus propiedadas
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    private Funcionario funcionario;

    private LocalDate fecha;

    private LocalTime horaEntrada;

    private LocalTime horaSalida;

    // Método para calcular la cantidad de horas trabajadas
    public long getHorasTrabajadas() {
        if (horaEntrada != null && horaSalida != null) {
            return java.time.Duration.between(horaEntrada, horaSalida).toMinutes() / 60;
        }
        return 0;
    }
}
