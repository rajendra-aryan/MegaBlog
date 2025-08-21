import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice';
import postsSlice from './postsSlice';
import notificationsSlice from './notificationsSlice';
import editorDraftSlice from './editorDraftSlice';
import uploadSlice from './uploadSlice';
import settingsSlice from './settingsSlice';
import filtersSlice from './filtersSlice';
import commentsSlice from './commentsSlice';

const store = configureStore({
    reducer: {
        auth : authSlice,
        posts: postsSlice,
        notifications: notificationsSlice,
        editorDraft: editorDraftSlice,
        upload: uploadSlice,
        settings: settingsSlice,
        filters: filtersSlice,
        comments: commentsSlice,
    }
});


export default store;