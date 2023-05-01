import GetApiUrlForAction from "../shared/getApiUrlForAction";
import Sleep from '../shared/sleep';

const GetNicknameById = async (userid: number): Promise<string> => {
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
            return "";

        return fetchedJson.data;
    }
    catch {
        return "Failed to fetch";
    }
}

export { GetNicknameById }
