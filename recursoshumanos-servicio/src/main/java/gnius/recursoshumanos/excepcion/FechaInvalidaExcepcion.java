package gnius.recursoshumanos.excepcion;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class FechaInvalidaExcepcion extends RuntimeException {
    public FechaInvalidaExcepcion(String mensaje) {
        super(mensaje);
    }
}
