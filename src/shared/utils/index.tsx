const ACCESS_TOKEN_KEY = 'accessToken'

export const accessTokenStorage = {
  set: (token: string) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, token)
  },

  get: (): string | null => {
    return localStorage.getItem(ACCESS_TOKEN_KEY)
  },

  remove: () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
  },

  exists: (): boolean => {
    return Boolean(localStorage.getItem(ACCESS_TOKEN_KEY))
  },
}