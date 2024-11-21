import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import {sign} from "hono/jwt";
import { userSignupSchema, userSiginSchema } from "@ctrlaltelite/common";

export const user = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>();


user.post('/signup', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const parsedResult = userSignupSchema.safeParse(body);

    if(parsedResult.success) {
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
    }
    else {
        c.status(422);
        return c.json({
            error: 'Invalid data'
        });
    }

    
})

user.post('/signin', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const parsedResult = userSiginSchema.safeParse(body);
    
    if(parsedResult.success) {
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
    }
    else {
        c.status(422);
        return c.json({
            error: 'Invalid data'
        });
    }
});

export default user;
