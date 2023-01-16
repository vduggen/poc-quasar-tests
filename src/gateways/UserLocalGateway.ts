import { userMock, userReposMock } from "../mocks";
import UserGateway from "./UserGateway";

export default class UserLocalGateway implements UserGateway {
    findByUsername(username: string): any {
        return UserLocalGateway.userMockByUsername(username);
    }

    private static userMockByUsername(username: string) {
        if (username === 'vduggen') return userMock.vduggen;
        if (username === 'rocketseat') return userMock.rocketseat;
        if (username === 'brunorovela') return userMock.brunorovela;
    }

    private static reposMockByUsername(username: string) {
        if (username === 'vduggen') return userReposMock.vduggen;
        if (username === 'rocketseat') return userReposMock.rocketseat;
    }

    getReposByUsername(username: string, page: number): any {
        return {
            data: UserLocalGateway.reposMockByUsername(username),
            headers: {
                link: '<https://api.github.com/user/53385727/repos?sort=created_at&content=true&page=2>; rel="next", <https://api.github.com/user/53385727/repos?sort=created_at&content=true&page=3>; rel="last"'
            }
        };
    }
}