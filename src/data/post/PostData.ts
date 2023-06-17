import PostContentData from "../shared/postcontent/postContentData";

class PostData {
    ID: number;
    AuthorID: number;
    Title: string;
    Slug: string;
    Content: PostContentData;
    LastEditTime: Date;
    CreateTime: Date;

    constructor(id: number, authorid: number, title: string, slug: string, content: PostContentData, lastEditTime: Date, createTime: Date) {
        this.ID = id;
        this.AuthorID = authorid;
        this.Title = title;
        this.Slug = slug;
        this.Content = content;
        this.LastEditTime = lastEditTime;
        this.CreateTime = createTime;
    }

    static Empty(): PostData {
        return new PostData(0, 0, "", "", new PostContentData(), new Date(), new Date());
    }
}

export default PostData;