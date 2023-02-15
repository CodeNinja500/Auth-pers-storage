export interface MeResponseModel {
  readonly data: {
    user: {
      context: {
        user_id: string;
        email: string;
      };
    };
  };
}
