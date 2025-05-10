const ACCESS_TOKEN_KEY = 'accessToken'

export const accessTokenStorage = {
  setToken: (token: string) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, token)
  },

  getToken: (): string | null => {
    return localStorage.getItem(ACCESS_TOKEN_KEY)
  },

  removeToken: () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
  },

  hasToken: (): boolean => {
    return Boolean(localStorage.getItem(ACCESS_TOKEN_KEY))
  },
}