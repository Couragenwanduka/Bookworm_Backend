import categoryModel from "../model/category";

export const createCategory = async (name: string, user: string) => {
  try {
    const category = new categoryModel({
      name,
      user
    });
    await category.save();
    return category;
  } catch (error) {
    console.log(error);
  }
};

export const findCategoryById = async (id: string, name: string) => {
  try {
    const category = await categoryModel.find({ user: id, name: name });
    return category;
  } catch (error) {
    console.log(error);
  }
};

export const findCategory = async (id:string) => {
  try{
    const category = await categoryModel.find({user:id})
    return category
  }catch(error){
    console.log(error)
  }
}