import { PostComment } from "./post-comment";

export class PostModel {
    id: number;
    title: string;
    description: string;
    category: string;
    imageUrl?: string;
    comments?: PostComment[];
    state?: postState;

}

export enum postState {
    Added = "Added",
    Modified = "Modified",
    Existing = "Existing",
    Deleted = "Deleted"
}
