export type ImageResult = {
    id: string,
    urls: {
        full: string,
        raw: string,
        regular: string,
        small: string,
        thumb: string
    },
    alt_description: string
}

export type UnsplashResponse = {
    total: number,
    total_pages: number,
    results: ImageResult[]
}