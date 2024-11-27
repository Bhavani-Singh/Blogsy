import { Hono } from 'hono'
import { blog } from './routes/blog';
import { user } from './routes/user';
import { cors } from 'hono/cors';

export const app = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
        userId: string
    }
}>();

app.use(cors());
app.route('/api/v1/blog', blog);
app.route('/api/v1/user', user);

export default app;
