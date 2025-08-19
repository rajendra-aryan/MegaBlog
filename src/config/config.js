const config ={
    AppWriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    AppWriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    AppWriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    AppWriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    // TODO: Set this in your .env (VITE_APPWRITE_COMMENTS_COLLECTION_ID) to enable Appwrite-backed comments
    AppWriteCommentsCollectionId: String(import.meta.env.VITE_APPWRITE_COMMENTS_COLLECTION_ID || ''),
    AppWriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
}

export default config;