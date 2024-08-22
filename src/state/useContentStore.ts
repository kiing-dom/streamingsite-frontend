import { create } from 'zustand';
import axios from 'axios';
import { useUserStore } from './userStore';

interface Category {
    id: number;
    name: string;
}

interface ContentItem {
    id: number;
    title: string;
    description: string;
    category: Category;
    tags: string[];
    durationMinutes: number;
    instructor: string;
    difficultyLevel: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
    uploadStatus: 'pending' | 'uploading' | 'completed' | 'error';
    videoUrl?: string; // Optional URL for the video
    thumbnailUrl?: string; // Optional URL for the thumbnail
}

interface ContentState {
    contentList: ContentItem[];
    newContent: ContentItem;
    videoFile: File | null;
    thumbnailFile: File | null;
    fetchContent: () => Promise<void>;
    setNewContent: (content: Partial<ContentItem>) => void;
    setVideoFile: (file: File) => void;
    setThumbnailFile: (file: File) => void;
    handleSubmit: () => Promise<void>;
    handleDelete: (id: number) => Promise<void>;
    resetForm: () => void; 
}

export const useContentStore = create<ContentState>((set, get) => ({
    contentList: [],
    newContent: {
        id: 0,
        title: '',
        description: '',
        category: {id: 1, name: 'Programming'},
        tags: [],
        durationMinutes: 0,
        instructor: '',
        difficultyLevel: 'BEGINNER',
        uploadStatus: 'pending',
    },
    videoFile: null,
    thumbnailFile: null,

    fetchContent: async () => {
        const { username, password } = useUserStore.getState();
        const encodedCredentials = btoa(`${username}:${password}`);

        try {
            const response = await axios.get('http://localhost:8080/api/content', {
                headers: {
                    Authorization: `Basic ${encodedCredentials}`,
                }
            });
            set({ contentList: response.data });
            console.log(response.data)

        } catch (error) {
            console.error('Error fetching content', error);
        }
    },

    setNewContent: (content) => {
        set((state) => ({
            newContent: { ...state.newContent, ...content },
        }));
    },

    setVideoFile: (file) => set({ videoFile: file }),

    setThumbnailFile: (file) => set({ thumbnailFile: file }),

    handleSubmit: async () => {
        const { newContent, videoFile, thumbnailFile, contentList } = get();
        const { username, password } = useUserStore.getState();

        if (!username || !password) {
            console.error("No credentials available");
            return;
        }

        if (newContent.title && videoFile && thumbnailFile) {
            const formData = new FormData();
            formData.append('content', JSON.stringify(newContent));
            formData.append('video', videoFile);
            formData.append('thumbnail', thumbnailFile);

            const encodedCredentials = btoa(`${username}:${password}`);

            try {
                const response = await axios.post('http://localhost:8080/api/content', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Basic ${encodedCredentials}`
                    },
                });

                set({ contentList: [...contentList, response.data] });
                get().resetForm();
            } catch (error) {
                console.error('Error uploading content:', error);
            }
        }
    },

    handleDelete: async (id: number) => {
        const { username, password } = useUserStore.getState();

        if (!username || !password) {
            console.error("No credentials available");
            return;
        }

        const encodedCredentials = btoa(`${username}:${password}`);

        try {
            await axios.delete(`http://localhost:8080/api/content/${id}`, {
                headers: {
                    Authorization: `Basic ${encodedCredentials}`
                }
            });
            set((state) => ({
                contentList: state.contentList.filter((item) => item.id !== id),
            }));
        } catch (error) {
            console.error('Error deleting content:', error);
        }
    },

    resetForm: () => {
        set({
            newContent: {
                id: 0,
                title: '',
                description: '',
                category: { id: 1, name: 'Programming' },
                tags: [],
                durationMinutes: 0,
                instructor: '',
                difficultyLevel: 'BEGINNER',
                uploadStatus: 'pending',
            },
            videoFile: null,
            thumbnailFile: null,
        });
    },
}));
