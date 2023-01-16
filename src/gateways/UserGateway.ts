import Repository from "../entities/Repository";
import UserInfo from "../entities/UserInfo";

type Response<D> = {
    data: D;
    headers: any;
    rateLimit: RateLimit;
}

export interface RateLimit { 
    used: number;
    limit: number;
    time: string;
}

export type FindByUsernameResponse = Promise<Response<UserInfo>>;
export type GetReposByUsernameResponse = Promise<Response<Repository[]>>;

export default interface UserGateway {
    findByUsername(username: string): FindByUsernameResponse;
    getReposByUsername(username: string, page: number): GetReposByUsernameResponse;
}