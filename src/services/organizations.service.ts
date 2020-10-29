import { Request } from 'express';

import { QueryResult } from 'pg';
import { pool } from '../database';
import { ErrorHandler } from '../util/error-handler';

class OrganizationService {
    /**
     * Service to get all organization
     * @param req Request
     */
    async getOrganizations(req: Request): Promise<object[]> {
        try {
            const result: QueryResult = await pool.query(`SELECT * FROM "organizations"`);

            return result.rows;
        } catch (error) {
            throw error;
        }
    };

    /**
     * Service to get organization by id
     * @param orgname string
     */
    async getOrganizationById(orgname: string) {
        try {
            const result: QueryResult = await pool.query(`SELECT id FROM "organizations" WHERE LOWER("organizations"."name") = $1`, [orgname]);

            if (result.rows.length === 0) {
                throw new ErrorHandler(404, 'Resource Not Found');
            }

            return result.rows[0].id;
        } catch (error) {
            throw error;
        }
    }
}

export const organizationService = new OrganizationService();