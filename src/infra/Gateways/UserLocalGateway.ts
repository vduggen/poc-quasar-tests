import { userMock, userReposMock } from "../../mocks";
import UserGateway from "./UserGateway";

export default class UserLocalGateway implements UserGateway {
    findByUsername(username: string): any {
        return userMock;
    }

    getReposByUsername(username: string, page: number): any {
        return {
            data: userReposMock,
            headers: {
                link: '<https://api.github.com/user/53385727/repos?sort=created_at&content=true&page=2>; rel="next", <https://api.github.com/user/53385727/repos?sort=created_at&content=true&page=3>; rel="last"'
            }
        };
    }
}