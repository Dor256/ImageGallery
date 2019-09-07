type URLS = {
    full: string,
    raw: string,
    regular: string,
    small: string,
    thumb: string
}

export type ImageResult = {
    id: string,
    urls: URLS,
    alt_description: string
}

export type UnsplashResponse = {
    total: number,
    total_pages: number,
    results: ImageResult[]
}