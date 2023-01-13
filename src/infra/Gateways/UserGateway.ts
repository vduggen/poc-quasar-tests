export default interface UserGateway {
    findByUsername(username: string): Promise<any>;
    getReposByUsername(username: string, page: number): Promise<any>;
}