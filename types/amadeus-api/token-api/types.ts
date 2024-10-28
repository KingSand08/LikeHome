// API RESPONSE DATA AND STRUCTURE

export type APIValidTokenResponse = {
  type: string;
  username: string;
  application_name: string;
  client_id: string;
  token_type: string;
  access_token: string;
  expires_in: number;
  state?: string;
  scope?: string;
  [key: string]: any;
};

export const API_TOKEN_ROUTE = "/api/amadeus/hotels/token"