import IPostContentNodeData from "../IPostContentNodeData";
import PostContentEditorNodeData from "../PostContentEditorNodeData";

class PostContentNodeImageData implements IPostContentNodeData {
    type: string = "image"
    description: string = "";
    url: string = "";
    fileBase64: string = "";
    width: number = 0;
    height: number = 0;

    editor: PostContentEditorNodeData = new PostContentEditorNodeData()

    constructor(type: string, description: string, url: string, width: number, height: number) {
        this.type = type;
        this.description = description;
        this.url = url;
        this.width = width;
        this.height = height;
    }
}

export default PostContentNodeImageData;