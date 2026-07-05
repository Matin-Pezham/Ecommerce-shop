export type ApiResponse<T> = {
  data: T
  message?: string
}

export type AppRoute = {
  path: string
  name: string
}
