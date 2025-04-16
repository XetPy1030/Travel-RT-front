import { Configuration, ApiApi } from './generated'
import axios from "axios";

const config = new Configuration({
    basePath: import.meta.env.VITE_API_BASE_URL,
})

export const $api = {
    // news: new NewsApi(config),
    // places: new PlacesApi(config),
    // routes: new RoutesApi(config),
    api: new ApiApi(config),
    // Кастомные методы
    uploadImage: (file: File) => {
        const formData = new FormData()
        formData.append('file', file)
        return axios.post('/upload', formData)
    }
}