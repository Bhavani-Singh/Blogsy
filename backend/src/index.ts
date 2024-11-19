import { Hono } from 'hono'
import { decode, sign, verify } from 'hono/jwt'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'


const app = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>();

app.get("/", (c) => c.text("Hello Hono"));

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
        return c.json({message: "failure while creating new user", error});
    }
})

app.post('/api/v1/user/signin', (c) => {
    return c.json({message: 'User signin'})
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
