const API_BASE = "https://modpod.live/api";
const OAUTH2_AUTHORIZE = "https://modpod.live/oauth2/authorize";

function redirectToAuthorize() {
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
        }
    }
}

export async function getUser() {
    fetch("")
}