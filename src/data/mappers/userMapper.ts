import type { User } from '@/data/types/User'

const mapToUser = (raw: any): User => {
  return {
    id: raw.id,
    firstName: raw.firstName,
    lastName: raw.lastName,
    email: raw.email,
    job: raw.job,
  }
}

export { mapToUser }
