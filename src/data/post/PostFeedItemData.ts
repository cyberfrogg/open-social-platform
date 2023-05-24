import PostData from "./PostData";

class PostFeedItemData {
    Index: number = 0;
    IsRenderedOnServer = false;
    AuthorNickname: string = "";
    IsAuthorNicknameLoaded = false;
    ResponseData: PostData = PostData.Empty();
}

export default PostFeedItemData;