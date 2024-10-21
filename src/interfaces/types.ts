export interface IProduct {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
    categoryId: number;
}

// Si en el futuro quieres añadir categorías, puedes definir una interfaz para ellas
export interface ICategory {
    id: number;
    name: string;
}

// En caso de que necesites definir una respuesta más general que incluya varios productos
export interface ProductsResponse {
    products: IProduct[];
}

export interface ILoginProps {
   
    email: string,
    password: string;
}
export interface IErrorsProps {
    email?: string,
    password?: string;
}

export interface IRegisterProps {
   
    email: string,
    password: string;
    name:string,
    username:string,
    address:string;
    phone:string;
}
export interface IErrorsRegisterProps {
   
    email: string,
    password: string;
    name:string,
    username:string,
    address:string;
    phone:string;
}
// interfaces/types.ts
export interface IUser {
    email: string;
    password: string;
    name:string;
    address:string;
    
  }
  
  export interface IUserSession {
    token: string;
    user: {
        address:string;
        email: string;
        id: number;
        name:string
        phone: string;
        role: string;
        orders: []

    
        
   
  }}
  export interface IOrder {
    id: number;
    status:string;
    date: Date;
    products: IProduct[]
  }
  
  export interface ICardProps {
    id: number; 
    name: string;
    price: number;
    stock: number;
    description: string;
    image: string;
  
  }
  

