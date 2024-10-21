"use client"; // Esto indica que el componente debe ser renderizado en el cliente

import { ButtonProps } from "./types";

const Button: React.FC<ButtonProps> = ({ children, onClick, disabled }) => {
  return (
    <button className="ml-4 px-12 bg-amber-400 rounded-lg" onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
