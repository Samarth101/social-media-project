import conf from "../assets/conf/conf";
import { Client, Databases, Storage, Query } from "appwrite";


export class Service {
    client = new Client()
    databases;
    bucket;

    constructor(){
        this.client.setEndpoint(conf.appwriteURL)
        .setEndpoint(conf.appwriteProjectId)
        this.databases = new Databases(this.client)
        this.bucket= new Storage(this.client)


    }


    async getPost(slug){
        try {
            this.databases.getDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug)
        } catch (error) {
            console.log ("Appwrite service :: getPost() :: ",error)
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId, queries)
        } catch (error) {
            console.log ("Appwrite service :: getPosts() :: ",error)
            return false
        }
    }

    async createPost({title, slug, content, featuredImage, status, userid}) {
        try {
            return await this.getDocument.createDocument(
                conf.appwriteDatabaseId, conf.appwriteCollectionId,slug,{
                    title,content, featuredImage, status, userid
                }
            )
        } catch (error) {
            console.log ("Appwrite service :: createPost() :: ",error)
            return false
        }
    }

    async updatePodt(slug,{title, content, featuredImage, status}) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId, conf.appwriteCollectionId,slug,
                {
                    title,content, featuredImage, status
                }
            )
        } catch (error) {
            console.log ("Appwrite service :: updatePost() :: ",error)
            return false
        }
    }

    async deletPodt(slug) {
        try {
            return await this.databases.deleteDocument(
                conf.appwriteDatabaseId, conf.appwriteCollectionId,slug
            )
            return true;
                
        } catch (error) {
            console.log ("Appwrite service :: deletePost() :: ",error)
            return false
        }
    }

    // storage service

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log ("Appwrite service :: uploadFile() :: ",error)
            return false
        }
    }
    
    
    async deleteFile(fileId) {
        try {
            return await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log ("Appwrite service :: deleteFile() :: ",error)
            return false
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        ).href

    }
}

const service = new service()
export default service;