import GetApiUrlForAction from "../../shared/getApiUrlForAction";

const GetUserByNickname = async (nickname: string): Promise<number | null> => {
    const apiUrl = GetApiUrlForAction("user/getuserbynickname");

    const payload = {
        "nickname": nickname
    };

    try {
        //fetch
        const fetchedRequest = await fetch(apiUrl, {
            body: JSON.stringify(payload),
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json",
                Accept: "application/json"
            })
        });

        const fetchedJson = await fetchedRequest.json();

        if (fetchedJson.success == false)
            return null;

        return fetchedJson.data;
    }
    catch (e) {
        console.error(e);
        return null;
    }
}

export { GetUserByNickname }
