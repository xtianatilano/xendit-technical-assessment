import { Request } from 'express';

import { QueryResult } from 'pg';
import { pool } from '../database';

class OrganizationMemberService {
    /**
     * Service to get organization members
     * @param req Request
     */
    async getOrgMembers(req: Request): Promise<object[]> {
        try {
            const result: QueryResult = await pool.query(`
                SELECT
                    "members"."id",
                    "members"."username",
                    "members"."password",
                    "members"."avatarUrl",
                    (
                        SELECT count(id)
                        FROM "member_followers"
                        WHERE "member_followers"."userId" = "members"."id"
                    ) AS "followerCount",
                    (
                        SELECT count(id)
                        FROM "member_followers"
                        WHERE "member_followers"."followerId" = "members"."id"
                    ) AS "followingCount"
                FROM "members"
                INNER JOIN "organization_members" ON "organization_members"."memberId" = "members"."id"
                INNER JOIN "organizations" ON "organizations"."id" = "organization_members"."organizationId"
                WHERE LOWER("organizations"."name") = $1
                ORDER BY "followerCount" DESC
            `, [req.params.orgname]);

            return result.rows;
        } catch (error) {
            throw error;
        }
    };
}

export const organizationMemberService = new OrganizationMemberService();