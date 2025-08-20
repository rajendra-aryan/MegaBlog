import config from "../config/config";
import {Client, Databases, ID, Permission, Role , Query} from "appwrite";

export class CommentsService {
    client = new Client();
    databases;

    constructor(){
        this.client
            .setEndpoint(config.AppWriteUrl)
            .setProject(config.AppWriteProjectId);
        this.databases = new Databases(this.client);
    }

    async listComments(postId,{limit=10, cursor}={}){
        const queries = [
            Query.equal("postId", postId),
            Query.orderDesc("$createdAt"),
            Query.limit(limit),
        ];
        if (cursor) queries.push(Query.cursorAfter(cursor));
        return this.databases.listDocuments(
            config.AppWriteDatabaseId,
            config.AppWriteCommentsCollectionId,
            queries
        );
    }

     async createComment({ postId, text, authorId, authorName }){
        return this.databases.createDocument(
            config.AppWriteDatabaseId,
            config.AppWriteCommentsCollectionId,
            ID.unique(),
            { postId, text, authorId, authorName },
            [
                Permission.read(Role.any()),
                Permission.update(Role.user(authorId)),
                Permission.delete(Role.user(authorId)),
            ]
        );
    }

}


const commentsService = new CommentsService();
export default commentsService;