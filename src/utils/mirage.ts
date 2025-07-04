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
      server.createList('user', 30)
    },

    routes() {
      this.namespace = 'api'
      this.timing = 1500

      this.get('/users', (schema, request) => {
        const page = Number(request.queryParams.page || 1)
        const perPage = Number(request.queryParams.perPage || 10)
        const search = (request.queryParams.search as string)?.toLowerCase() || ''
        const orderBy = (request.queryParams.orderBy as string)?.toLowerCase() || ''

        let users = schema.all('user').models

        if (search) {
          users = users.filter(
            (user) =>
              (user.firstName as string).toLowerCase().includes(search) ||
              (user.lastName as string).toLowerCase().includes(search),
          )
        }

        if (orderBy) {
          switch (orderBy) {
            case 'id':
              users = users.sort((a, b) => Number(a.id) - Number(b.id))
              break
            case 'name':
              users = users.sort((a, b) => {
                const nameA = `${a.firstName} ${a.lastName}`.toLowerCase()
                const nameB = `${b.firstName} ${b.lastName}`.toLowerCase()
                return nameA.localeCompare(nameB)
              })
              break
            default:
              break
          }
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
        if (user) return { result: user }
        else return new Response(404, undefined, { message: 'Usuário não encontrado' })
      })

      this.put('/users/:id', (schema, request) => {
        const id = request.params.id
        const attrs = JSON.parse(request.requestBody)
        const user = schema.find('user', id)

        if (user) {
          const updatedUser = user.update(attrs)
          return { result: updatedUser }
        } else {
          return new Response(404, undefined, { message: 'Usuário não encontrado' })
        }
      })

      this.delete('/users/:id', (schema, request) => {
        const id = request.params.id
        const user = schema.find('user', id)

        if (!user) return new Response(404, undefined, { message: 'Usuário não encontrado' })
        if (Number(user.id) === 1)
          return new Response(400, undefined, {
            message: 'O usuário com ID 1 não pode ser excluído',
          })

        user.destroy()
        return new Response(204)
      })
    },
  })
}
