import { Request, Response } from 'express';
import { organizationCommentService } from '../services/organization-comments.service';
import { AbstractController } from '../abstract/abstract.controller';

export default class OrganizationCommentController extends AbstractController {
    public path = '/orgs/:orgname/comments';

    constructor() {
        super();
        this.initRoutes();
    }

    public initRoutes() {
        this.router.get(this.path, this.getOrgComments.bind(this));
        this.router.post(this.path, this.postOrgComments.bind(this));
        this.router.delete(this.path, this.deleteOrgComments.bind(this));
    }

    /**
     * Route to get organization comments
     * @param req Request
     * @param res Response
     */
    public async getOrgComments (req: Request, res: Response): Promise<Response<any> | undefined> {
        try {
            return this.ok(res, await organizationCommentService.getOrgComments(req));
        } catch (error) {
            return this.fail(res, error);
        }
    };

    /**
     * Route to add organization comment
     * @param req Request
     * @param res Response
     */
    public async postOrgComments(req: Request, res: Response) {
        try {
            return this.created(res, await organizationCommentService.postOrgComments(req));
        } catch (error) {
            return this.fail(res, error);
        }
    };

    /**
     * Route to soft delete organization comments
     * @param req Request
     * @param res Response
     */
    public async deleteOrgComments(req: Request, res: Response) {
        try {
            await organizationCommentService.deleteOrgComments(req);
            return this.ok(res);
        } catch (error) {
            return this.fail(res, error);
        }
    };
}