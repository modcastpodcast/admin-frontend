import {User} from "./types";

const API_BASE = "https://modpod.live/api";
const OAUTH2_AUTHORIZE = "https://modpod.live/oauth2/authorize";

const USER_CACHE: { [id: string] : User } = {}

export function redirectToAuthorize() {
    document.location.href = OAUTH2_AUTHORIZE;
}

async function get(route: string) {
    if (localStorage.token) {
        try {
            return await fetch(`${API_BASE}${route}`, {
                headers: {
                    Authorization: localStorage.token
                }
            })
        } catch(e) {
            redirectToAuthorize();
            throw 403;
        }
    } else {
        redirectToAuthorize();
        throw 403;
    }
}

export async function getUser(userID: string): Promise<User> {
    if (USER_CACHE[userID]) {
        return new Promise((resolve) => {
            resolve(USER_CACHE[userID]);
        })
    };

    let user = await get(`/users/${userID}`);

    let user_data = await user.json();

    return user_data;
}

export async function getCurrentUser() {
    let user = await get("/me");

    let currentToken = await user.json();

    return currentToken;
}