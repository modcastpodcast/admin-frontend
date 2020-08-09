import {User, APIKey, Link} from "./types";

const API_BASE = "https://modpod.live/api";
const OAUTH2_AUTHORIZE = "https://modpod.live/oauth2/authorize";

const USER_CACHE: { [id: string] : User } = {}

let CURRENT_USER_CACHE: APIKey | null = null;

export function redirectToAuthorize() {
    document.location.href = OAUTH2_AUTHORIZE;
}

async function get(route: string): Promise<any> {
    if (localStorage.token) {
        try {
            return await fetch(`${API_BASE}${route}`, {
                headers: {
                    Authorization: localStorage.token
                }
            })
        } catch(e) {
            redirectToAuthorize();
            // Return a never resolving promise to stop continued execution
            return new Promise(() => {});
        }
    } else {
        redirectToAuthorize();
        // Return a never resolving promise to stop continued execution
        return new Promise(() => {});
    }
}

async function post(route: string, data: object): Promise<any> {
    if (localStorage.token) {
        try {
            return await fetch(`${API_BASE}${route}`, {
                method: "POST",
                headers: {
                    "Authorization": localStorage.token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
        } catch(e) {
            redirectToAuthorize();
            // Return a never resolving promise to stop continued execution
            return new Promise(() => {});
        }
    } else {
        redirectToAuthorize();
        // Return a never resolving promise to stop continued execution
        return new Promise(() => {});
    }
}

async function patch(route: string, data: object): Promise<any> {
    if (localStorage.token) {
        try {
            return await fetch(`${API_BASE}${route}`, {
                method: "PATCH",
                headers: {
                    "Authorization": localStorage.token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
        } catch(e) {
            redirectToAuthorize();
            // Return a never resolving promise to stop continued execution
            return new Promise(() => {});
        }
    } else {
        redirectToAuthorize();
        // Return a never resolving promise to stop continued execution
        return new Promise(() => {});
    }
}

async function deleteRequest(route: string, data: object): Promise<any> {
    if (localStorage.token) {
        try {
            return await fetch(`${API_BASE}${route}`, {
                method: "DELETE",
                headers: {
                    "Authorization": localStorage.token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
        } catch(e) {
            redirectToAuthorize();
            // Return a never resolving promise to stop continued execution
            return new Promise(() => {});
        }
    } else {
        redirectToAuthorize();
        // Return a never resolving promise to stop continued execution
        return new Promise(() => {});
    }
}

export async function getUser(userID: string): Promise<User> {
    if (USER_CACHE[userID]) {
        return USER_CACHE[userID];
    };

    let user = await get(`/user/${userID}`);

    let user_data = await user!.json();

    USER_CACHE[user_data.id] = user_data;

    return user_data;
}

export async function getCurrentUser(): Promise<APIKey> {
    if (CURRENT_USER_CACHE)
        return CURRENT_USER_CACHE;

    let user = await get("/me");

    let currentToken = await user!.json();

    CURRENT_USER_CACHE = currentToken;

    return currentToken;
}

export async function getAllURLs(): Promise<Link[]> {
    let linksReq = await get("/links/all")

    let rawLinks = await linksReq!.json();

    const links = [];

    for (var rawLink of rawLinks) {
        links.push({
            short_code: rawLink.short_code,
            long_url: rawLink.long_url,
            clicks: rawLink.clicks,
            creation_date: new Date(rawLink.creation_date * 1000),
            creator: await getUser(rawLink.creator),
            notes: rawLink.notes
        })
    }

    return links;
}

export async function getMyURLs(): Promise<Link[]> {
    let linksReq = await get("/links/mine")

    let rawLinks = await linksReq!.json();

    const links = [];

    for (var rawLink of rawLinks) {
        links.push({
            short_code: rawLink.short_code,
            long_url: rawLink.long_url,
            clicks: rawLink.clicks,
            creation_date: new Date(rawLink.creation_date * 1000),
            creator: await getUser(rawLink.creator),
            notes: rawLink.notes
        })
    }

    return links;
}

export async function getAllUsers(): Promise<User[]> {
    let userTokensReq = await get("/admin/users");
    let userTokens: APIKey[] = await userTokensReq!.json();

    let users = [];

    for (var userToken of userTokens) {
        let user = await getUser(userToken.creator);
        user.api_key = userToken;

        users.push(user);
    }

    return users;
}

export async function createUserAccount(userID: string, administrator: boolean): Promise<any> {
    let createRequest = await post("/admin/create_user", {
        creator: userID,
        is_admin: administrator
    })

    let resp = createRequest!.json();

    return resp;
}

export async function createShortURL(shortCode: string, longURL: string): Promise<any> {
    let createRequest = await post("/create", {
        short_code: shortCode,
        long_url: longURL
    })

    let resp = createRequest!.json();

    return resp;
}

export async function deleteShortURL(shortCode: string): Promise<any> {
    let del = await deleteRequest("/delete", {
        short_code: shortCode
    });

    let resp = await del!.json();

    return resp;
}

export async function updateShortURL(oldShortCode: string, newShortCode: string, longURL: string) {
    let update = await patch(`/update/${oldShortCode}`, {
        short_code: newShortCode,
        long_url: longURL
    });

    let resp = await update!.json();

    return resp;
}