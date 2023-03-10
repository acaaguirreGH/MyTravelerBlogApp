import { Guid } from "typescript-guid";
import { PostComment } from "./post-comment";

export class PostModel {
    id: string;
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
