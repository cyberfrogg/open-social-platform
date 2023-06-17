import IPostContentNodeData from "../IPostContentNodeData";
import PostContentEditorNodeData from "../PostContentEditorNodeData";

class PostContentNodeImageData implements IPostContentNodeData {
    type: string = "image"
    assetUuid: string = "";
    description: string = "";
    url: string = "";
    width: number = 0;
    height: number = 0;

    editor: PostContentEditorNodeData = new PostContentEditorNodeData()

    constructor(type: string, assetUuid: string, description: string, url: string, width: number, height: number) {
        this.type = type;
        this.assetUuid = assetUuid;
        this.description = description;
        this.url = url;
        this.width = width;
        this.height = height;
    }
}

export default PostContentNodeImageData;