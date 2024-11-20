import { Hono } from 'hono'
import { blog } from './routes/blog';
import { user } from './routes/user';

export const app = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
        userId: string
    }
}>();


app.route('/api/v1/blog', blog);
app.route('/api/v1/user', user);

export default app
