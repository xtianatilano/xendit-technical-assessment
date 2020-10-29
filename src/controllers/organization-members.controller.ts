import { Request, Response } from 'express';
// App
import { AbstractController } from '../abstract/abstract.controller';
import { organizationMemberService } from '../services/organization-members.service';

export default class OrganizationMemberController extends AbstractController {
    public path = '/orgs/:orgname/members';

    constructor() {
        super();
        this.initRoutes();
    }

    public initRoutes() {
        this.router.get(this.path, this.getOrgMembers.bind(this));
    }

    /**
     * Route to get organization members
     * @param req Request
     * @param res Response
     */
    public async getOrgMembers (req: Request, res: Response): Promise<Response<any> | undefined> {
        try {
            return this.ok(res, await organizationMemberService.getOrgMembers(req));
        } catch (error) {
            return this.fail(res, error);
        }
    };
}