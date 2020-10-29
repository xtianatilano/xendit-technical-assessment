import { Request } from 'express';
import { QueryResult } from 'pg';
// App
import { pool } from '../database';
import { ErrorHandler } from '../util/error-handler';
import { organizationService } from './organizations.service';

class OrganizationCommentService {
    /**
     * Service to get organization comments by org name
     * @param req
     */
    async getOrgComments(req: Request): Promise<object[]> {
        try {
            const result: QueryResult = await pool.query(`
                SELECT
                    "comments"."id",
                    "comments"."comment"
                FROM "comments"
                INNER JOIN "organization_comments" ON "organization_comments"."commentId" = "comments"."id"
                INNER JOIN "organizations" ON "organizations"."id" = "organization_comments"."organizationId"
                WHERE LOWER("organizations"."name") = $1 AND "comments"."deleted" != $2
            `, [req.params.orgname, 1]);

            return result.rows;
        } catch (error) {
            throw error;
        }
    };

    /**
     * Service to add an organization comment
     * @param req Request
     */
    async postOrgComments(req: Request): Promise<object> {
        try {
            const orgId: QueryResult = await organizationService.getOrganizationById(req.params.orgname);

            const { comment } = req.body;

            if (comment === undefined) {
                throw new ErrorHandler(400, 'Bad Request');
            }

            const { rows }: QueryResult = await pool.query(`
                INSERT INTO "comments" ("comment") VALUES ($1) RETURNING id
            `, [comment]);

            const commentId = rows[0].id;

            await pool.query(`
                INSERT INTO "organization_comments" ("commentId", "organizationId") VALUES ($1, $2)
            `, [commentId, orgId]);

            return {
                id: commentId,
                ...req.body,
            };
        } catch (error) {
            throw error;
        }
    };

    /**
     * Service to soft delete organization comments
     * @param req Request
     */
    async deleteOrgComments(req: Request) {
        try {
            await pool.query(`
                UPDATE "comments"
                SET "deleted" = 1, "updatedAt" = NOW()
                FROM "organization_comments"
                INNER JOIN "organizations" ON "organizations"."id" = "organization_comments"."organizationId"
                WHERE LOWER("organizations"."name") = $1
            `, [req.params.orgname]);
            return;
        } catch (error) {
            throw error;
        }
    }

    async getOrgMembers(req: Request) {
        try {

        } catch (error) {
            throw error;
        }
    }
}

export const organizationCommentService = new OrganizationCommentService();