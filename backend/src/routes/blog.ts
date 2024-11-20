import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { verify } from "hono/jwt";


export const blog = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
        userId: string
    }
}>();



blog.use('/*', async (c, next) => {
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


blog.post('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const userId = c.get('userId');
    const body = await c.req.json();

    try {
        const result = await prisma.bpost.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: userId
            }
        });

        if(result) {
            const postId = result.id;
            const updatedUser = await prisma.buser.update({
                where: {
                    id: userId
                },
                data: {
                    post: {
                        connect: {id: postId}
                    }
                }
            });

            if(updatedUser) {
                c.status(200);
                return c.json({
                    message: 'post created successfully'
                });
            }
            else {
                c.status(401)
                return c.json({
                    error: 'forbidden'
                });
            }
        }
    }
    catch(error) {
        c.status(500);
        return c.json({
            error: 'internal server error while creating the post'
        })
    }
    return c.json({message: 'Blog post'})
});

blog.put('blog', (c) => {
    return c.json({message: 'Blog put'})
});

blog.get('/api/v1/blog/:id', (c) => {
    return c.json({message: c.req.param('id')}) 
});

blog.get('/api/v1/blog/bulk', (c) => {
    return c.json({message: 'Blog bulk'})
});

export default blog;