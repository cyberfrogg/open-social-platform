const GetUserUrlFromNickname = (nickname: string): string => {
    if (nickname == undefined || nickname == "") {
        return new URL("user", process.env.NEXT_PUBLIC_WEBSITE_URL).href
    }

    const nicknameUri = encodeURI(nickname);
    const url = new URL("user/" + nicknameUri, process.env.NEXT_PUBLIC_WEBSITE_URL);

    return url.href;
}

export { GetUserUrlFromNickname }