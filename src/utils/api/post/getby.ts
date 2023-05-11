import GetApiUrlForAction from "@/utils/shared/getApiUrlForAction";
import PostData from "@/data/post/PostData";
import ReqResponse from "@/data/shared/reqResponse";

const GetPostsBy = async (columnname: string, value: string | number, orderByFieldname: string, isReverseOrder: boolean, limit: number, offset: number): Promise<ReqResponse<Array<PostData>>> => {
    const apiUrl = GetApiUrlForAction("post/getby");

    const payload = {
        columnname: columnname,
        value: value,
        isReverse: isReverseOrder,
        orderBy: orderByFieldname,
        limit: limit,
        offset: offset
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
        return new ReqResponse(false, "ERRCODE_UNKNOWN", new Array<PostData>);
    }
}

export { GetPostsBy }
