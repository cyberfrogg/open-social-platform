const GetApiUrlForAction = (action: string): string => {
    const apiBase = process.env.NEXT_PUBLIC_WEBSITE_API_BASE;
    const apiVer = process.env.NEXT_PUBLIC_WEBSITE_CURRENT_API_VERSION;

    return apiBase + "v" + apiVer + "/" + action
}

export default GetApiUrlForAction;