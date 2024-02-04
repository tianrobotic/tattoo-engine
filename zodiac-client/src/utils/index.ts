import axios from 'axios';
import { Image } from "../interface"
import { AxiosError } from 'axios';
import dataset from "../data/tattoos.json"

const ACCESS_KEY = import.meta.env.VITE_API_KEY as string


export const getImages = async (query: string): Promise<Image[]> => {
    // const url = `https://api.unsplash.com/search/photos?query=${query}&client_id=${ACCESS_KEY}`
    const url = 'http://localhost:5000/api/tattoo?prompt='+query
    try {
        const { data } = await axios.get(url)
        let tattoos: Image[] = dataset
        let tattoo: Image = data
        console.log(tattoo)
        console.log(tattoos.unshift(tattoo))
        return tattoos.slice(0,11)
    } catch (error) {
        throw new Error((error as AxiosError).message)
    }
}
