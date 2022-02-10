import { User } from "./User";

export class LoginResponse {
    'user': User;
    'jwt': string;
    'accessCommunity': string[];
}
