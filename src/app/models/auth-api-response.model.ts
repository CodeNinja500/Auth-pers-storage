export interface AuthApiResponseModel {
  readonly data: {
    id: string;
    accessToken: string;
    refreshToken: string;
  };
}
