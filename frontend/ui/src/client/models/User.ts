/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Item } from './Item';

export type User = {
    email?: (string | null);
    is_active?: (boolean | null);
    is_superuser?: boolean;
    full_name?: (string | null);
    id: number;
    items?: Array<Item>;
};
