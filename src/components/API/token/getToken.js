export function getToken(){
    const token = localStorage.getItem("token");

    if(!token){
        console.log("토큰이 없습니다.");
        return;
    }
    
    return token;
}