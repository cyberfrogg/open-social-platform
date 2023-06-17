import IPostContentNodeData from "../IPostContentNodeData";
import PostContentEditorNodeData from "../PostContentEditorNodeData";

class PostContentNodeLinkData implements IPostContentNodeData {
    type: string = "link"
    text: string
    url: string
    editor: PostContentEditorNodeData = new PostContentEditorNodeData()

    constructor(type: string, text: string, url: string) {
        this.type = type;
        this.text = text;
        this.url = url;
    }
}

export default PostContentNodeLinkData;