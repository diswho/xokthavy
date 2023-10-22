/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Item } from '../models/Item';
import type { ItemCreate } from '../models/ItemCreate';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ItemsService {

    /**
     * Create Item For User
     * @param userId 
     * @param requestBody 
     * @returns Item Successful Response
     * @throws ApiError
     */
    public static createItemForUserApiV1ItemsUsersUserIdItemsPost(
userId: number,
requestBody: ItemCreate,
): CancelablePromise<Item> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/items/users/{user_id}/items/',
            path: {
                'user_id': userId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Read Items
     * @param skip 
     * @param limit 
     * @returns Item Successful Response
     * @throws ApiError
     */
    public static readItemsApiV1ItemsItemsGet(
skip?: number,
limit: number = 100,
): CancelablePromise<Array<Item>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/items/items/',
            query: {
                'skip': skip,
                'limit': limit,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
