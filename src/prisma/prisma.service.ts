import { Injectable } from '@nestjs/common'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client/extension'


@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL!,
    })

    super({
      adapter,

      log: [
        { emit: 'event', level: 'query' },
        { emit: 'stdout', level: 'error' },
      ],
    })

    // biome-ignore lint/suspicious/noExplicitAny: reason
    ;(this as any).$on('query', (e: any) => {
      if (e.duration > 100) {
        console.warn('🐢 Slow query', {
          query: e.query,
          params: e.params,
          duration: e.duration,
        })
      }
    })
  }
}
