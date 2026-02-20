export async function uploadAvatar(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    await fetch("/api/avatar", {
        method: "POST",
        body: formData
    });
}