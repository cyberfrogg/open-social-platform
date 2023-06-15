import ReqResponse from "@/data/shared/reqResponse";
import UserAssetsRowData from "@/data/user/assets/userassetsrowdata";
import GetApiUrlForAction from "@/utils/shared/getApiUrlForAction";

const UserAssetsUpload = async (token: string, file: Buffer): Promise<ReqResponse<UserAssetsRowData>> => {
    const apiUrl = GetApiUrlForAction("user/assets/upload");

    let formData = new FormData();
    formData.append('token', token);
    formData.append('uploadfile', new File([file], "upload.png"));

    try {
        //fetch
        const fetchedRequest = await fetch(apiUrl, {
            mode: 'cors',
            body: formData,
            method: "POST"
        });

        const fetchedJson = await fetchedRequest.json();
        const fetchedJsonAsData = fetchedJson as ReqResponse<UserAssetsRowData>;

        return fetchedJsonAsData;
    }
    catch (e) {
        console.error("Failed to make api request for " + apiUrl + " Error message:");
        console.error(e);

        return ReqResponse.Fail("ERRCODE_UNKNOWN");
    }
}

export { UserAssetsUpload }
