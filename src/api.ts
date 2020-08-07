import {User, APIKey, Link} from "./types";

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

    let user = await get(`/user/${userID}`);

    let user_data = await user.json();

    return user_data;
}

export async function getCurrentUser(): Promise<APIKey> {
    let user = await get("/me");

    let currentToken = await user.json();

    return currentToken;
}

export async function getAllURLs(): Promise<Link[]> {
    let linksReq = await get("/links/all")

    let rawLinks = await linksReq.json();

    const links = [];

    for (var rawLink of rawLinks) {
        links.push({
            short_code: rawLink.short_code,
            long_url: rawLink.long_url,
            clicks: rawLink.clicks,
            creation_date: new Date(rawLink.creation_date * 1000),
            creator: await getUser(rawLink.creator)
        })
    }

    return links;
}