import { getProfileApi } from "../API/profile/getProfileApi";
import { getToken } from "../API/token/getToken";
import { loadProfile } from "./loadProfile";
import { loadWishlist } from "./loadWishlist";
import { goToIndex } from "./goToIndex";
import { changeLayout } from "./changeLayout";
import { loadRecent } from "./loadRecent";
import { logout } from "./logout";
import { editProfile } from "./editProfile";
import { editAddress } from "./editAdress";
import { withdrawInput } from "./withdrawInput";
import { initAddressSearch } from "../login/addressSearch";

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
}
handlerProfile();