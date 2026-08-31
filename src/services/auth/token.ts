import {ref} from "vue";

let accessToken: ref<string | null> = ref(null)

export function setAccessToken(token: string | null): void {
    accessToken = token
}

export function getAccessToken(): string | null {
    return accessToken
}