import Cookies from 'universal-cookie';

export function setTokenCookies(token: string) {
    const cookies = new Cookies();
    let expires = new Date()

    expires.setTime(expires.getTime() + 7)

    // cookies.set('emporiumAccessToken', token, { expires: expires });
    localStorage.setItem('emporiumAccessToken', token)

}

export function deleteTokenCookies() {
    localStorage.removeItem('emporiumAccessToken')
}

export function getTokenCookies() {
    const cookies = new Cookies();
    // const token = cookies.get('emporiumAccessToken')
    const token = localStorage.getItem('emporiumAccessToken')

    return token
}