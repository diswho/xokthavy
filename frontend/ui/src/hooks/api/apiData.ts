export type AuthData = {
  success: boolean;
  user: {
    user_id: string;
    email: string;
    full_name: string;
    auth_token: string;
  };
};
