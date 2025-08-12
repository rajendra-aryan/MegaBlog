import config from "../config/config";
import { Client, Account, ID } from "appwrite";


export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(config.AppWriteUrl)
            .setProject(config.AppWriteProjectId);
        this.account = new Account(this.client);
            
    }

    async createAccount({email, password, name}) {
        const userAccount = await this.account.create(ID.unique(), email, password, name);
        return userAccount ? this.login({email, password}) : userAccount;
    }

    async login({email, password}) {
        return this.account.createEmailPasswordSession(email, password);
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }
}

const authService = new AuthService();

export default authService