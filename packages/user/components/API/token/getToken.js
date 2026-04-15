export function getToken(){
    const token = localStorage.getItem("token");

    if(!token){
        return;
    }
    
    return token;
}