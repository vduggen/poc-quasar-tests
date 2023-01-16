import UserInfo from './UserInfo';

export default class User {
    userInfo!: UserInfo;
    
    existRepositories(): boolean {
        return this.userInfo && this.userInfo.existRepositories();
    }

    setUserInfo(value: UserInfo) {
        this.userInfo = value;
    }
}