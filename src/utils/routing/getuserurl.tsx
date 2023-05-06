const GetUserUrlFromId = (nickname: string): string => {
    const nicknameUri = encodeURI(nickname);
    const url = new URL("user/" + nicknameUri, process.env.NEXT_PUBLIC_WEBSITE_URL);

    return url.href;
}

export { GetUserUrlFromId }