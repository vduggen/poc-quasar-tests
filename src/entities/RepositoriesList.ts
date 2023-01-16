import Repository from "./Repository";

export default class RepositoriesList {
  repos: Repository[];
  forks: Repository[];

  constructor() {
    this.repos = [];
    this.forks = [];
  }

  setRepositories(repos: Repository[]) {
    for (const repo of repos) {
      const repository = new Repository(
        repo.created_at,
        repo.updated_at,
        repo.description,
        repo.name,
        repo.html_url,
        repo.fork
      );
      if (repo.fork) {
        this.addFork(repository);
      } else {
        this.addRepository(repository);
      }
    }
  }

  setRepos(repos: Repository[]) {
    this.repos = repos;
  }

  addRepository(repository: Repository) {
    this.repos.push(repository);
  }

  addFork(fork: Repository) {
    this.forks.push(fork);
  }

  reposIsEmpty() {
    return this.repos.length === 0;
  }

  forksIsEmpty() {
    return this.forks.length === 0;
  }

  getCountRepos() {
    return this.repos.length;
  }

  getCountForks() {
    return this.forks.length;
  }
}
