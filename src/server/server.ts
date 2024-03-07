import Fastify from 'fastify';
import FastifyStatic from '@fastify/static';
import { v4 } from 'uuid';
import { sign } from './func/crypto';
import { resolve } from 'path';

const fastify = Fastify({logger: true});

fastify.register(FastifyStatic, {
    root: resolve("./public")
})

fastify.post('/api/players', (req, res) => {
    const playerId = v4();
    const signature = sign(playerId);
    res.send({
        id: playerId, 
        signature: signature
    })
})

fastify.listen({port: 8000}).catch((err) => {
    fastify.log.error(err)
    process.exit(1)
}).then(() => {
    fastify.log.info('Le server écoute sur le port 8000')
})