import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { verify } from "hono/jwt";
import { blogSchema } from "@ctrlaltelite/common";


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
        error: 'unauthorized'
        });
    }     
});


blog.post('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const userId = c.get('userId');
    const body = await c.req.json();

    const parsedResult = blogSchema.safeParse(body);

    if (parsedResult.success) {
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
                    c.status(403)
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
    }
    else {
        c.status(422);
        return c.json({
            error: 'Invalid data'
        })
    }
    
});

blog.put('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const userId = c.get('userId');
    const body = await c.req.json();

    const parsedResult = blogSchema.safeParse(body);

    if(parsedResult.success) {
        try {
            const result = await prisma.bpost.update({
                where: {
                    id: body.id,
                    authorId: userId
                },
                data: {
                    title: body.title,
                    content: body.content
                }
            });
    
            if(result) {
                c.status(200)
                return c.json({
                    message: 'Post updated successfully'
                })
            }
        }
        catch(error) {
            c.status(500);
            return c.json({
                error: 'Internal server error while updating the post'
            });
        }
    }
    else {
        c.status(422);
        return c.json({
            error: 'Invalid data'
        })
    }
});


blog.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());   

    try {
        const result = await prisma.bpost.findMany();

        if(result) {
            c.status(200);
            return c.json(result);
        }
        else {
            c.status(403);
            return c.json({
                error: 'Forbidden'
            });
        }
    }
    catch(error) {
        c.status(500);
        return c.json({
            error: 'Internal server error while fetching blogs'
        });
    }
    
});


blog.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const blogId = c.req.param('id');

    try {
        const result = await prisma.bpost.findUnique({
            where: {
                id: blogId
            }
        });
    
        if(result) {
            c.status(200)
            return c.json(result);
        }
        else {
            console.log('/:id handler return statement')
            c.status(403);
            return c.json({
                error: 'Forbidden'
            })
        }
        
    }
    catch(error) {
        c.status(500);
        return c.json({
            error: 'Internal server error while fetching the blog'
        })
    }
});


export default blog;