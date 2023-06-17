
const fileToBuffer = async (file: File): Promise<Buffer> => {
    const imageFileArrayBuffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(imageFileArrayBuffer);
    return fileBuffer;
}

export default fileToBuffer;