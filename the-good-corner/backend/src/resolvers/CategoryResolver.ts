import {
  Arg,
  Field,
  ID,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { FindManyOptions } from "typeorm";
import Category from "../entities/Category";

@InputType()
class CategoryInput {
  @Field()
  title: string; // TODO make it required with "!" ?
}

@Resolver(Category)
export default class CategoryResolver {
  @Query(() => [Category])
  async getAllCategories() {
    let findOptions: FindManyOptions<Category> = {
      relations: { ads: true },
    };
    const allCategories = await Category.find(findOptions);

    return allCategories;
  }

  @Mutation(() => ID)
  async createCategory(@Arg("data") data: CategoryInput) {
    const category = Category.create({ ...data });
    await category.save();
    return category.id;
  }
}
