import config from "../config/config"
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client()
    database;
    bucket;
    constructor(){
        this.client
            .setEndpoint(config.AppWriteUrl)
            .setProject(config.AppWriteProjectId)
        this.database = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            return await this.database.createDocument(
                config.AppWriteDatabaseId,
                config.AppWriteCollectionId,
                slug,
                {title,content,featuredImage,status}
            )
        } catch (error) {
            throw error
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.database.updateDocument(
                config.AppWriteDatabaseId,
                config.AppWriteCollectionId,
                slug,
                {title,content,featuredImage,status}
            )
        } catch (error) {
            throw error            
        }
    }

    async deletePost(slug){
        try {
            return await this.database.deleteDocument(
                config.AppWriteDatabaseId,
                config.AppWriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            throw error
        }
    }

    async getPost(slug){
        try {
            return await this.database.getDocument(
                config.AppWriteDatabaseId,
                config.AppWriteCollectionId,
                slug
            )
        } catch (error) {
            throw error
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.database.listDocuments(
                config.AppWriteDatabaseId,
                config.AppWriteCollectionId,
                queries
            )
        } catch (error) {
            throw error
            return false
        }
    }

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                config.AppWriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            throw error
            return false
        }
    }

    async deleteFile(fileId){
        try {
            return await this.bucket.deleteFile(
                config.AppWriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            throw error
            return false
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            config.AppWriteBucketId,
            fileId
        )
    }
}


const service = new Service()
export default service