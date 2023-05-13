import IPostContentNodeData from "../IPostContentNodeData";
import PostContentEditorNodeData from "../PostContentEditorNodeData";

class PostContentNodeImageData implements IPostContentNodeData {
    type: string = "image"
    description: string
    url: string
    editor: PostContentEditorNodeData = new PostContentEditorNodeData()

    constructor(type: string, description: string, url: string) {
        this.type = type;
        this.description = description;
        this.url = url;
    }
}

export default PostContentNodeImageData;