/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_login_access_token_api_v1_login_access_token_post } from '../models/Body_login_access_token_api_v1_login_access_token_post';
import type { Token } from '../models/Token';
import type { User } from '../models/User';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class LoginService {

    /**
     * Login Access Token
     * @param formData 
     * @returns Token Successful Response
     * @throws ApiError
     */
    public static loginAccessTokenApiV1LoginAccessTokenPost(
formData: Body_login_access_token_api_v1_login_access_token_post,
): CancelablePromise<Token> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/login/access-token',
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Test Token
     * Test access token
     * @returns User Successful Response
     * @throws ApiError
     */
    public static testTokenApiV1TestTokenPost(): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/test-token',
        });
    }

}
