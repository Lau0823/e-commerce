import { IErrorsProps, IErrorsRegisterProps, ILoginProps } from "@/interfaces/types";
import { IRegisterProps } from "@/interfaces/types";

// Validación de Login
export function validateLoginForm(values: ILoginProps): IErrorsProps {
  const errors: IErrorsProps = {};

  // Validar email
  if (!values.email) {
    errors.email = "El correo electrónico es requerido.";
  } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    errors.email = "Correo electrónico no válido.";
  }

  return errors;
}

// Validación de Registro
export function validateRegisterForm(values: IRegisterProps): IErrorsRegisterProps {
  const errorsR: IErrorsRegisterProps = {
    email: "",
    password: "",
    name: "",
    username: "",
    address: "",
    phone: ""
  };

  // Validar nombre
  if (!values.name) {
    errorsR.name = "El nombre completo es requerido.";
  }

  // Validar email
  if (!values.email) {
    errorsR.email = "El correo electrónico es requerido.";
  } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    errorsR.email = "Correo electrónico no válido.";
  }

  // Validar username
  if (!values.username) {
    errorsR.username = "El nombre de usuario es requerido.";
  }

  // Validar password
  if (!values.password) {
    errorsR.password = "La contraseña es requerida.";
  } else if (values.password.length < 6) {
    errorsR.password = "La contraseña debe tener al menos 6 caracteres.";
  }

  // Validar dirección
  if (!values.address) {
    errorsR.address = "La dirección de envío es requerida.";
  }

  // Validar teléfono
  if (!values.phone) {
    errorsR.phone = "El número de teléfono es requerido.";
  } else if (!/^\d{7,14}$/.test(values.phone)) {
    errorsR.phone = "Número de teléfono no válido.";
  }

  return errorsR;
}
