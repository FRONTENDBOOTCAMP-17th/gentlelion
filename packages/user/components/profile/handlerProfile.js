import { getProfileApi } from "../API/profile/getProfileApi";
import { getToken } from "../API/token/getToken";
import { loadProfile } from "./loadProfile";
import { loadWishlist } from "./loadWishlist";
import { goToIndex } from "./goToIndex";
import { changeLayout } from "./changeLayout";
import { loadRecent } from "./loadRecent";
import { logout } from "./logout";
import { editProfile } from "./editProfile";
import { editAddress } from "./editAddress";
import { withdrawInput } from "./withdrawInput";
import { initAddressSearch } from "../login/addressSearch";
import { formatPhoneNumber } from "../login/formatPhoneNumber";
import { checkKoreanName } from "../login/checkKoreanName";

async function handlerProfile() {
    const data = await getProfileApi(getToken())
    loadProfile(data);
    loadWishlist(getToken());
    loadRecent(getToken());
    goToIndex();
    changeLayout();
    logout();
    editProfile();
    editAddress(data);
    withdrawInput();
    initAddressSearch();
    formatPhoneNumber();

    ["editFn", "editLn"].forEach((id) => {
        document.getElementById(id).addEventListener("input", () => {
            const isValid = checkKoreanName(id);
            const errorEl = document.getElementById("editNameError");
            if (errorEl) {
                errorEl.classList.toggle("hidden", isValid);
            }
        });
    });
}
handlerProfile();