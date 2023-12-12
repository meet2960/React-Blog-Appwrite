import { toast } from 'react-toastify';
import conf from '@/conf/conf';
import { Client, ID, Databases, Storage, Query } from 'appwrite';

export class DatabaseService {
  client = new Client();
  databases;
  bucket;
  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost(userId, slug, { title, content, featuredImage, visibility, status }) {
    try {
      return await this.databases.createDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug, {
        slug,
        title,
        content,
        featuredImage,
        status,
        visibility,
        userId
      });
    } catch (error) {
      console.log('Error in create Post', error);
    }
  }

  async updatePost(slug, { title, content, featureImage, status }) {
    try {
      return await this.databases.updateDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug, {
        title,
        content,
        featureImage,
        status
      });
    } catch (error) {
      console.log('Error', error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug);
      return true;
    } catch (error) {
      console.log('Error', error);
      toast.error('Error, Something went Wrong');
      return false;
    }
  }

  async getSinglePost(slug) {
    try {
      return await this.databases.getDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug);
    } catch (error) {
      console.log('Error in getSinglePost', error);
    }
  }

  async getAllActivePost(queries = [Query.equal('status', 'active')]) {
    try {
      return await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId, queries);
    } catch (error) {
      console.log('Error While getting allActive post', error);
      return false;
    }
  }

  async getSelectedUserPost(queries = []) {
    try {
      return await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId, queries);
    } catch (error) {
      console.log('Error While getting allActive post', error);
      return false;
    }
  }

  async getPosts() {
    console.log('inside all documents');
    try {
      return await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId);
    } catch (error) {
      console.log('Error While getting allActive post', error);
      return false;
    }
  }

  // ! File upload services
  async uploadFile(file) {
    return await this.bucket.createFile(conf.appwriteBucketId, ID.unique(), file);
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log('Error in deleting file', error);
      return false;
    }
  }

  async getFilePreview(fileId) {
    const getImage = await this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
    // console.log("getImage", getImage);
    return getImage.href;
  }
}

const databaseService = new DatabaseService();

export default databaseService;
