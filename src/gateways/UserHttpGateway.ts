import axios from "axios";
import UserInfo from "../entities/UserInfo";
import Notification from "../infra/Notification";
import UserGateway, { FindByUsernameResponse, GetReposByUsernameResponse, RateLimit } from "./UserGateway";

const messages: Record<number, string> = {
    403: 'Atingiu o limite de requisições',
    404: 'Usuário não encontrado',
}

export default class UserHttpGateway implements UserGateway {
    private readonly baseUrl: string = 'https://api.github.com/users';

    constructor(
        readonly notification: Notification
    ) {}

    private updateRateLimit(headers: any): RateLimit {
        const used = headers['x-ratelimit-remaining'];
        const limit = headers['x-ratelimit-limit'];
        const dateInstance = new Date(0);
        dateInstance.setUTCSeconds(headers['x-ratelimit-reset']);
        const time = `${dateInstance.getHours()}:${dateInstance.getMinutes()}`;
        return {
            used,
            limit,
            time
        }
    }

    async findByUsername(username: string): FindByUsernameResponse {
        try {
            const { data, headers } = await axios.get(`${this.baseUrl}/${username}`);
            const userInfo = new UserInfo(
                data.followers,
                data.following,
                data.public_repos,
                data.bio,
                data.location,
                data.name,
                data.created_at,
                data.avatar_url,
                data.login,
                data.repos_url
            );
            const rateLimit = this.updateRateLimit(headers);
            return {
                data: userInfo,
                headers,
                rateLimit
            };
        } catch (e: any) {
            console.log(e);
            const errorStatus = e.response.status as number;
            const message = messages[errorStatus] || 'Não foi possível buscar informações do usuário';
            this.notification.error(message, 'top');
            return Promise.reject(message);
        }
    }

    async getReposByUsername(username: string, page: number): GetReposByUsernameResponse {
        const { data, headers } = await axios.get(`${this.baseUrl}/${username}/repos`, {
            params: {
                sort: 'created_at',
                content: true,
                page
            }
        });
        const rateLimit = this.updateRateLimit(headers);
        return {
            data,
            headers,
            rateLimit
        }
    }
}