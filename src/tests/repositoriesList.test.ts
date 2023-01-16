import RepositoriesList from "../entities/RepositoriesList"
import Repository from "../entities/Repository";

describe('RepositoriesList', () => {
    it('Ao adicionar 2 forks e 1 não fork o contador deve retornar 2', () => {
        const repositoriesList = new RepositoriesList();
        repositoriesList.addFork(new Repository('', '', '', '', '', true));
        repositoriesList.addFork(new Repository('', '', '', '', '', true));
        repositoriesList.addFork(new Repository('', '', '', '', '', false));
        expect(repositoriesList.getCountForks()).equal(2)
    })

    it('Ao adicionar 2 repositórios e 1 fork o contador de repositórios deve retornar 2', () => {
        const repositoriesList = new RepositoriesList();
        repositoriesList.addRepository(new Repository('', '', '', '', '', false));
        repositoriesList.addRepository(new Repository('', '', '', '', '', false));
        repositoriesList.addRepository(new Repository('', '', '', '', '', true));
        expect(repositoriesList.getCountRepos()).equal(2)
    })
})