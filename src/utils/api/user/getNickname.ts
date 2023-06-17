import GetApiUrlForAction from "@/utils/shared/getApiUrlForAction";

const GetNicknameById = async (userid: number): Promise<string | null> => {
    const apiUrl = GetApiUrlForAction("user/getnickname");

    const payload = {
        "userid": userid
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
    catch {
        return null;
    }
}

export { GetNicknameById }
