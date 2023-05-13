import IPostContentNodeData from "../IPostContentNodeData";
import PostContentEditorNodeData from "../PostContentEditorNodeData";

class PostContentNodeTextData implements IPostContentNodeData {
    type: string = "text"
    text: string
    editor: PostContentEditorNodeData = new PostContentEditorNodeData()

    constructor(type: string, text: string) {
        this.type = type;
        this.text = text;
    }
}

export default PostContentNodeTextData;