export type UserForm = Omit<User, 'id'>

export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  job: string
}
