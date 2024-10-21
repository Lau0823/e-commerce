// types.ts
export interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void; // Hacer que onClick sea opcional
    disabled?: boolean;
  }
  