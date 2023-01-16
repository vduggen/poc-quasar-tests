import { date } from "quasar";

export default class UserInfo {

    constructor(
        readonly followers: number = 0,
        readonly following: number = 0,
        readonly public_repos: number = 0,
        readonly bio: string = '',
        readonly location: string = '',
        readonly name: string = '',
        readonly created_at: string | null = null,
        readonly avatar_url: string = '',
        readonly login: string = '',
        readonly repos_url: string = '',
    ) {
        this.created_at = UserInfo.getCreatedAt(created_at);
    }

    private static getCreatedAt(created_at: string | null): string {
        if (!created_at) return '';
        const month = date.formatDate(created_at, 'MMMM');
        const monthInLowerCase = month.toLowerCase();
        const year = date.formatDate(created_at, 'YYYY');
        return `${monthInLowerCase} de ${year}`;
    }

    existRepositories() {
        return this.public_repos > 0;
    }
}