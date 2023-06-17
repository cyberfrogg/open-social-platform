const GetPostUrlFromSlugAndId = (id: number, slug: string): string => {
    const nicknameUri = encodeURI(slug);
    const url = new URL("post/" + id + "/" + nicknameUri, process.env.NEXT_PUBLIC_WEBSITE_URL);

    return url.href;
}

export { GetPostUrlFromSlugAndId }