const fileToBase64 = async (file: File): Promise<string> => {
    const base64 = await fileToBase64Internal(file);
    return base64 as string;
}

// https://stackoverflow.com/questions/36280818/how-to-convert-file-to-base64-in-javascript
const fileToBase64Internal = (file: File) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
});

export default fileToBase64;