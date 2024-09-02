import React from 'react'
import { Link } from 'react-router-dom';
import '../estilos/estilo.css'

export const Botones = ({ type,value, onChange, placeholder, required, className, ...restProps }) => {
    return (
        <button
         type="submit"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className={`btn btn-primary boton-css btn-sm me-3 ${className}`}
            {...restProps}
        />
    );
};
export const LinkTO = ({ to, className = '', ...restProps }) => {
    return (
        <Link
            to={to ="/"}  // Usa la propiedad to para la ruta dinámica
            className={`btn btn-warning btn-orange boton-css btn-sm me-3 ${className}`}  // Combina las clases
            {...restProps}  // Pasa el resto de las propiedades
        />
    );
};
