import { ALL_PRINCIPAL_TYPES, PrincipalType } from '@activepieces/shared'
import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox'
import { Type } from '@sinclair/typebox'
import { StatusCodes } from 'http-status-codes'

const shadowController: FastifyPluginAsyncTypebox = async (app) => {
    app.post(
        '/import',
        {
            config: {
                allowedPrincipals: ALL_PRINCIPAL_TYPES,
            },
            schema: {
                body: Type.Unknown(),
                response: {
                    [StatusCodes.OK]: Type.Object({
                        status: Type.Literal('received'),
                    }),
                },
                tags: ['Shadow'],
                description: 'Import shadow recording data captured by the browser extension.',
            },
        },
        async (request, reply) => {
            app.log.info({ shadowPayload: request.body, principalType: (request.principal as { type: PrincipalType }).type }, 'Shadow import received')
            await reply.status(StatusCodes.OK).send({ status: 'received' })
        },
    )
}

export const shadowModule: FastifyPluginAsyncTypebox = async (app) => {
    await app.register(shadowController, { prefix: '/v1/shadow' })
}
