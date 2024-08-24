import { create } from "zustand";
import axios from "axios";
import { useUserStore } from "./userStore";

interface Category {
  id: number;
  name: string;
  description: string;
}

export interface ContentItem {
  id: number;
  title: string;
  description: string;
  category: Category;
  tags: string[];
  durationMinutes: number;
  instructor: string;
  difficultyLevel: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  uploadStatus: "pending" | "uploading" | "completed" | "error";
  videoUrl?: string;
  thumbnailUrl?: string;
}

interface ContentState {
  contentList: ContentItem[];
  newContent: ContentItem;
  videoFile: File | null;
  thumbnailFile: File | null;
  categories: Category[];
  fetchContent: () => Promise<void>;
  fetchCategories: () => Promise<void>;
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
    title: "",
    description: "",
    category: { id: 0, name: "", description: "" },
    tags: [],
    durationMinutes: 0,
    instructor: "",
    difficultyLevel: "BEGINNER",
    uploadStatus: "pending",
  },
  videoFile: null,
  thumbnailFile: null,
  categories: [],

  fetchContent: async () => {
    const { username, password } = useUserStore.getState();
    const encodedCredentials = btoa(`${username}:${password}`);

    try {
      const response = await axios.get("http://localhost:8080/api/content", {
        headers: {
          Authorization: `Basic ${encodedCredentials}`,
        },
      });
      set({ contentList: response.data });
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching content", error);
    }
  },

  fetchCategories: async () => {
    const { username, password } = useUserStore.getState();
    const encodedCredentials = btoa(`${username}:${password}`);

    try {
      const response = await axios.get("http://localhost:8080/api/categories", {
        headers: {
          Authorization: `Basic ${encodedCredentials}`,
        },
      });
      const fetchedCategories = response.data;
      set({ categories: fetchedCategories });

      // Set default category to the first fetched category, if available
      if (fetchedCategories.length > 0) {
        set((state) => ({
          newContent: {
            ...state.newContent,
            category: fetchedCategories[0], // Set the first category as default
          },
        }));
      }
    } catch (error) {
      console.error("Error fetching categories", error);
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

        // Append content data as JSON string
        const contentData = {
            title: newContent.title,
            description: newContent.description,
            category: {
                id: newContent.category.id,
                name: newContent.category.name,
                description: newContent.category.description
            },
            tags: newContent.tags,
            durationMinutes: newContent.durationMinutes,
            instructor: newContent.instructor,
            difficultyLevel: newContent.difficultyLevel
        };
        formData.append('content', new Blob([JSON.stringify(contentData)], {
            type: 'application/json'
        }));

        // Append files
        formData.append('video', videoFile);
        formData.append('thumbnail', thumbnailFile);

        const encodedCredentials = btoa(`${username}:${password}`);

        try {
            const response = await axios.post('http://localhost:8080/api/content', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Basic ${encodedCredentials}`
                },
                transformRequest: [(data, headers) => {
                    // Remove Content-Type header, let the browser set it
                    delete headers['Content-Type'];
                    return data;
                }],
            });

            console.log('Response:', response.data);
            set({ contentList: [...contentList, response.data] });
            get().resetForm();
        } catch (error: unknown) {
            console.error('Error uploading content:', error);
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    console.error('Response data:', error.response.data);
                    console.error('Response status:', error.response.status);
                    console.error('Response headers:', error.response.headers);
                } else if (error.request) {
                    console.error('Request made but no response received:', error.request);
                } else {
                    console.error('Error setting up the request:', error.message);
                }
            } else {
                console.error('Non-Axios error:', error);
            }
        }
    } else {
        console.error('Missing required fields');
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
          Authorization: `Basic ${encodedCredentials}`,
        },
      });
      set((state) => ({
        contentList: state.contentList.filter((item) => item.id !== id),
      }));
    } catch (error) {
      console.error("Error deleting content:", error);
    }
  },

  resetForm: () => {
    set((state) => ({
      newContent: {
        id: 0,
        title: "",
        description: "",
        category:
          state.categories.length > 0
            ? state.categories[0]
            : { id: 0, name: "", description: "" },
        tags: [],
        durationMinutes: 0,
        instructor: "",
        difficultyLevel: "BEGINNER",
        uploadStatus: "pending",
      },
      videoFile: null,
      thumbnailFile: null,
    }));
  },
}));
