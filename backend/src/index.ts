import { Hono } from 'hono'
import { decode, sign, verify } from 'hono/jwt'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'


const app = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
        userId: string
    }
}>();

app.post('/api/v1/user/signup', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    console.log(body);

    try {
        const result = await prisma.buser.create({
            data: {
                email: body.email,
                name: body.name,
                password: body.password
            }
        });

        const payload = { id: result.id}
        const jwt_token = await sign(payload, c.env.JWT_SECRET);
        
        c.status(201);
        return c.json({message: 'User created successfully', jwt_token});
    }
    catch(error) {
        c.status(403)
        return c.json({error: "failure while creating new user",});
    }
})

app.post('/api/v1/user/signin', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    try {
        const result = await prisma.buser.findUnique({
            where: {
                email: body.username
            }
        });

        if(result) {
            const payload = {
                id: result.id
            }
            const jwt_token = await sign(payload, c.env.JWT_SECRET);

            c.status(200)

            return c.json({
                jwt: jwt_token
            });
        }
        else {
            c.status(401)
            return c.json({
                error: "Invalid credentials"
            });
        }
    }
    catch(error) {
        c.status(500)
        return c.json({
            error: 'Internal server error'
        });
    }
});


app.use('/api/v1/blog/*', async (c, next) => {
    const jwt = c.req.header('Authorization');
    
    if(!jwt) {
        c.status(401);
        return c.json({
            error: 'unauthorized'
        });
    }

    const token = jwt.split(' ')[1];

    console.log(token);

    try {
        const payload = await verify(token, c.env.JWT_SECRET);

        console.log(payload);

        if(payload && typeof payload.id === 'string') {
            c.set('userId', payload.id);
            await next(); 
        }
        else {
            c.status(401);
            return c.json({
                error: 'unauthorized'
            });
        }
    }
    catch(error) {
        c.status(401);
        return c.json({
        error: 'invalid token'
        });
    }

    
      
});

app.post('/api/v1/blog', (c) => {
    return c.json({message: 'Blog post'})
});

app.put('/api/v1/blog', (c) => {
    return c.json({message: 'Blog put'})
});

app.get('/api/v1/blog/:id', (c) => {
    return c.json({message: c.req.param('id')}) 
});

app.get('/api/v1/blog/bulk', (c) => {
    return c.json({message: 'Blog bulk'})
});

export default app
