import { userDeleteApi } from "../../API/user/userDeleteApi.js";

export function userDelete(button, userId, onsuccess) {
    if (!button) {
        return;
    }

    if (userId === null) {
        console.error("userId가 없습니다.");
        return;
    }

    button.addEventListener("click", async () => {
        const confirmed = window.confirm("정말 삭제하시겠습니까?");

        if(!confirmed){
            return;
        }
        
        const result = await userDeleteApi(userId);
        
        if (!result) {
            console.error("삭제 실패");
            return;
        }
        
        onsuccess?.();
    });


}