import {User, APIKey, Link, Event} from "./types";

const API_BASE = "https://modpod.live/api";
const OAUTH2_AUTHORIZE = "https://modpod.live/oauth2/authorize";

const USER_CACHE: { [id: string] : User } = {}

let CURRENT_USER_CACHE: APIKey | null = null;

export function redirectToAuthorize(): void {
    document.location.href = OAUTH2_AUTHORIZE;
}

async function get(route: string): Promise<Response> {
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
            return new Promise(() => null);
        }
    } else {
        redirectToAuthorize();
        // Return a never resolving promise to stop continued execution
        return new Promise(() => null);
    }
}

async function post(route: string, data: Record<string, unknown>): Promise<Response> {
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
            return new Promise(() => null);
        }
    } else {
        redirectToAuthorize();
        // Return a never resolving promise to stop continued execution
        return new Promise(() => null);
    }
}

async function patch(route: string, data: Record<string, unknown>): Promise<Response> {
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
            return new Promise(() => null);
        }
    } else {
        redirectToAuthorize();
        // Return a never resolving promise to stop continued execution
        return new Promise(() => null);
    }
}

async function deleteRequest(route: string, data: Record<string, unknown>): Promise<Response> {
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
            return new Promise(() => null);
        }
    } else {
        redirectToAuthorize();
        // Return a never resolving promise to stop continued execution
        return new Promise(() => null);
    }
}

export async function getUser(userID: string): Promise<User> {
    if (USER_CACHE[userID]) {
        return USER_CACHE[userID];
    }

    const user = await get(`/users/${userID}`);

    if (!user) {
        throw new Error("No user returned");
    }

    const user_data = await user.json();

    USER_CACHE[user_data.id] = user_data;

    return user_data;
}

export async function getCurrentUser(): Promise<APIKey> {
    if (CURRENT_USER_CACHE)
        return CURRENT_USER_CACHE;

    const user = await get("/users/me");

    if (!user) {
        throw new Error("No user returned");
    }

    const currentToken = await user.json();

    CURRENT_USER_CACHE = currentToken;

    return currentToken;
}

export async function getAllURLs(): Promise<Link[]> {
    const linksReq = await get("/link")

    if (!linksReq) {
        throw new Error("Could not fetch links")
    }

    const rawLinks = await linksReq.json();

    const links = [];

    for (const rawLink of rawLinks) {
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
    const linksReq = await get("/link?mine=1")

    if (!linksReq) {
        throw new Error("Could not fetch links")
    }

    const rawLinks = await linksReq.json();

    const links = [];

    for (const rawLink of rawLinks) {
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
    const userTokensReq = await get("/admin/users");

    if (!userTokensReq) {
        throw new Error("No users returned")
    }

    const userTokens: APIKey[] = await userTokensReq.json();

    const users = [];

    for (const userToken of userTokens) {
        const user = await getUser(userToken.creator);
        user.api_key = userToken;

        users.push(user);
    }

    return users;
}

export async function createUserAccount(userID: string, administrator: boolean): Promise<Record<string, unknown>> {
    const createRequest = await post("/admin/users", {
        creator: userID,
        is_admin: administrator
    })

    if (!createRequest) {
        throw new Error("Could not create user account")
    }

    const resp = createRequest.json();

    return resp;
}

export async function createShortURL(shortCode: string, longURL: string, notes: string): Promise<Record<string, unknown>> {
    const createRequest = await post("/link", {
        short_code: shortCode,
        long_url: longURL,
        notes: notes
    })

    if (!createRequest) {
        throw new Error("Could not create short URL account")
    }

    const resp = createRequest.json();

    return resp;
}

export async function deleteShortURL(shortCode: string): Promise<Record<string, unknown>> {
    const del = await deleteRequest("/link", {
        short_code: shortCode
    });

    const resp = await del.json();

    return resp;
}

export async function updateShortURL(oldShortCode: string, newShortCode: string, longURL: string, notes: string): Promise<Record<string, unknown>> {
    const update = await patch(`/link`, {
        old_short_code: oldShortCode,
        short_code: newShortCode,
        long_url: longURL,
        notes: notes
    });

    const resp = await update.json();

    return resp;
}

export async function transferShortURL(oldShortCode: string, newCreator: string): Promise<Record<string, unknown>> {
    const update = await patch(`/link`, {
        old_short_code: oldShortCode,
        creator: newCreator
    });

    const resp = await update.json();

    return resp;
}

export async function fetchCalendarEvents(): Promise<Event[]> {
    const events = await get("/calendar/");

    const rawEvents = await events.json()

    const parsedEvents = [];

    for (const rawEvent of rawEvents) {
        parsedEvents.push({
            id: rawEvent.id,
            title: rawEvent.title,
            date: new Date(rawEvent.date),
            repeatConfiguration: rawEvent.repeat_configuration,
            creator: await getUser(rawEvent.creator)
        })
    }

    return parsedEvents;
}
