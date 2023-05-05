import {KEYS} from '../constants'
export function setToken(token) {
    localStorage.setItem(KEYS.ACCESS_TOKEN, token)
}

export function getToken() {
    return localStorage.getItem(KEYS.ACCESS_TOKEN)
}

export function removeToken() {
    localStorage.removeItem(KEYS.ACCESS_TOKEN)
}