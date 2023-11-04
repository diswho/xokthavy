export enum AuthActionEnum {
  LOG_IN = "LOG_IN",
  LOG_OUT = "LOG_OUT",
}
export type AuthAction =
  | {
      type: AuthActionEnum.LOG_IN;
      payload: {
        access_token: string;
        user_id: string;
        email: string;
        full_name: string;
        is_active: boolean;
        is_superuser: boolean;
      };
    }
  | {
      type: AuthActionEnum.LOG_OUT;
      payload: null;
    };
