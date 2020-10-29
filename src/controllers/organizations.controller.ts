import { Request, Response } from 'express';
// App
import { AbstractController } from '../abstract/abstract.controller';
import { organizationService } from '../services/organizations.service';

export default class OrganizationController extends AbstractController {
    public path = '/orgs';

    constructor() {
        super();
        this.initRoutes();
    }

    public initRoutes() {
        this.router.get(this.path, this.getOrganizations.bind(this));
    }

    /**
     * Route to get all organization
     * @param req Request
     * @param res Response
     */
    public async getOrganizations (req: Request, res: Response): Promise<Response<any> | undefined> {
        try {
            return this.ok(res, await organizationService.getOrganizations(req));
        } catch (error) {
            return this.fail(res, error);
        }
    };
}