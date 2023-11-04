export type AuthData = {
  success: boolean;
  user: {
    access_token: string;
    user_id: string;
    email: string;
    full_name: string;
    is_active: boolean;
    is_superuser: boolean;
  };
};
