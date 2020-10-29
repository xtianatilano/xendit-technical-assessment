import App from './app';
import OrganizationCommentController from './controllers/organization-comments.controller';
import OrganizationController from './controllers/organizations.controller';
import OrganizationMemberController from './controllers/organization-members.controller';
import bodyParser from 'body-parser';
import loggerMiddleware from './middleware/logger-middleware';
import errorMiddleware from './middleware/error-middleware';

const app = new App({
    port: parseInt(process.env.LOCAL_SERVER_PORT as string, 10) || 3000,
    controllers: [
        new OrganizationController(),
        new OrganizationCommentController(),
        new OrganizationMemberController(),
    ],
    middlewares: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        loggerMiddleware,
        errorMiddleware,
    ]
})

app.listen();