import {  ILoginProps, IRegisterProps} from "@/interfaces/types";

import  Swal from  "sweetalert2";
const API_URL = process.env.NEXT_PUBLIC_API_URL
export async function register(userData: IRegisterProps) {
    try {
       debugger
        
        const  res = await fetch (`${API_URL}/users/register`, {
            method :`POST`,
            headers: {
                "Content-type": "application/json"
            },
            body:JSON.stringify(userData)
        })
        if(res.ok) {
            return res.json()

        } else {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false, 
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              
            Toast.fire({
                icon: "error",
                title: "Failed to register"
        });
       throw Error ("Failed to register")
    }
 } catch (error:any) {
        throw new Error(error)
    }
};

export async function login(userData :ILoginProps) {
    try {
         const res = await fetch(`${API_URL}/users/login`, {
            method: "POST",
            headers: { 
                "Content-type": "application/json"
            },
            body: JSON.stringify(userData)
         })
         if (res.ok) {
            return res.json()
         } else {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer:3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter =Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "error",
                title: "Failed to login"
        });
       throw Error ("Failed to login")
    }
 } catch (error:any) {
        throw new Error(error)
    }
};
