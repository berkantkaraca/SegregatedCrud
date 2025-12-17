import { BaseCategoryViewModel } from "./BaseCategoryViewModel";

export class CategoryRequestModel extends BaseCategoryViewModel {
    constructor(categoryName: string, description: string) {
        super(categoryName, description);
    }   
}