export type Content = {
    $id: string;
    sectionId: string;
    type: "text" | "video" | "document";
    text: string;
    createAt?: string;
};
