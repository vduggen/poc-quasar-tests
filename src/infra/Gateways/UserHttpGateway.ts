import axios from "axios";
import UserGateway from "./UserGateway";

export default class UserHttpGateway implements UserGateway {
    private readonly baseUrl: string = 'https://api.github.com/users';

    async findByUsername(username: string): Promise<any> {
        const { data } = await axios.get(`${this.baseUrl}/${username}`);
        return data;
    }

    async getReposByUsername(username: string, page: number): Promise<any> {
        const { data, headers } = await axios.get(`${this.baseUrl}/${username}/repos`, {
            params: {
                sort: 'created_at',
                content: true,
                page
            }
        });
        return {
            data,
            headers
        }
    }
}