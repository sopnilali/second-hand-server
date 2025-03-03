import QueryBuilder from "../../builder/QueryBuilder";
import { IImageFile, IImageFiles } from "../../interface/IImageFIle";
import { CategorySearchableFields } from "./category.constant";
import { ICategory } from "./category.interface";
import Category from "./category.model";


// create a new category 
//* create category into database
const createCategoryFromDB = async (categoryData: Partial<ICategory>, categoryImages : IImageFile ) => {

    const category = new Category({
        ...categoryData,
        image: categoryImages?.path
      });
      const result = await category.save();
      return result;
}

// get all categories

const getAllCategoriesFromDB = async (query: Record<string, unknown>) => {

    const categoryQuery = new QueryBuilder(
        Category.find(),
        query)
        .search(CategorySearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields()

    const result = await categoryQuery.modelQuery
    const meta = await categoryQuery.countTotal();
    return {
        result,
        meta,
    };
}

const updateCategoryFromDB = async (categoryId : string, categoryData : ICategory, categoryImages : IImageFile) => {
    // update category
    const category = {
        ...categoryData,
        image: categoryImages?.path
      };
      const result = await Category.findByIdAndUpdate(categoryId, category, {new: true});
    return result;
}

const singleCategoryFromDB = async (categoryId: string) => {
    const result = await Category.findById(categoryId);
    return result;
}

const deleteCategoryFromDB = async (categoryId : string) => {
    const result = await Category.findByIdAndDelete(categoryId);
    return result;
}

export const categoryServices = {
    createCategoryFromDB,
    getAllCategoriesFromDB,
    updateCategoryFromDB,
    singleCategoryFromDB,
    deleteCategoryFromDB
}