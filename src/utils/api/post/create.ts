import GetApiUrlForAction from "@/utils/shared/getApiUrlForAction";
import PostData from "@/data/post/PostData";
import ReqResponse from "@/data/shared/reqResponse";
import PostContentData from "@/data/shared/postcontent/postContentData";

const CreatePost = async (title: string, data: PostContentData, token: string): Promise<ReqResponse<PostData | null>> => {
    const apiUrl = GetApiUrlForAction("post/create");

    const payload = {
        title: title,
        postContentData: data,
        token: token
    };

    console.log(payload);

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
        return new ReqResponse(false, "ERRCODE_UNKNOWN", null);
    }
}

export { CreatePost }
