import PostData from "@/data/post/PostData";
import ReqResponse from "@/data/shared/reqResponse";
import GetApiUrlForAction from "@/utils/shared/getApiUrlForAction";

const GetFeed = async (token: string, watchedpostsoffset: number): Promise<ReqResponse<PostData[]>> => {
    const apiUrl = GetApiUrlForAction("feed/get");

    const payload = {
        token: token,
        watchedpostsoffset: watchedpostsoffset
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
        return fetchedJson;

    }
    catch {
        return new ReqResponse(false, "ERRCODE_UNKNOWN", new Array<PostData>());
    }
}

export { GetFeed }
