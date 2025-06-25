import { createServer, Model, Factory, Response } from 'miragejs'
import { firstnames, jobs, lastnames } from './mirageMockData'

type User = {
  id: string
  firstName: string
  lastName: string
  email: string
  job: string
}

type UserFactoryAttrs = {
  firstName: string
  lastName: string
  email: string
  job: string
}

export function makeServer() {
  return createServer({
    models: {
      user: Model.extend<Partial<User>>({}),
    },

    factories: {
      user: Factory.extend<UserFactoryAttrs>({
        firstName() {
          return firstnames[Math.floor(Math.random() * firstnames.length)]
        },
        lastName() {
          return lastnames[Math.floor(Math.random() * lastnames.length)]
        },
        email() {
          const fullname = this.firstName.toString().concat(this.lastName.toString()).toLowerCase()
          return `${fullname}@example.com`
        },
        job() {
          return jobs[Math.floor(Math.random() * jobs.length)]
        },
      }),
    },

    seeds(server) {
      server.createList('user', 28)
    },

    routes() {
      this.namespace = 'api'
      this.timing = 1500

      this.get('/users', (schema, request) => {
        const page = Number(request.queryParams.page || 1)
        const perPage = Number(request.queryParams.perPage || 10)
        const search = (request.queryParams.search as string)?.toLowerCase() || ''

        let users = schema.all('user').models

        if (search) {
          users = users.filter(
            (user) =>
              (user.firstName as string).toLowerCase().includes(search) ||
              (user.lastName as string).toLowerCase().includes(search),
          )
        }

        const total = users.length
        const start = (page - 1) * perPage
        const end = start + perPage
        const paginatedUsers = users.slice(start, end)

        return {
          result: paginatedUsers,
          meta: {
            total,
            page,
            perPage,
            totalPages: Math.ceil(total / perPage),
          },
        }
      })

      this.post('/users', (schema, request) => {
        const attrs = JSON.parse(request.requestBody)
        const user = schema.create('user', attrs)
        return { result: user }
      })

      this.get('/users/:id', (schema, request) => {
        const id = request.params.id
        const user = schema.find('user', id)
        return { result: user }
      })

      this.put('/users/:id', (schema, request) => {
        const id = request.params.id
        const attrs = JSON.parse(request.requestBody)
        const user = schema.find('user', id)

        if (user) {
          const updatedUser = user.update(attrs)
          return { result: updatedUser }
        } else {
          return new Response(500)
        }
      })

      this.delete('/users/:id', (schema, request) => {
        const id = request.params.id
        const user = schema.find('user', id)
        if (user) {
          user.destroy()
          return new Response(204)
        } else {
          return new Response(500)
        }
      })
    },
  })
}
