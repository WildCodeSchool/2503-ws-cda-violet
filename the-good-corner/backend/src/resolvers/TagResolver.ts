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
import Tag from "../entities/Tag";

@InputType()
class TagInput {
  @Field()
  title: string; // TODO make it required with "!" ?
}

@Resolver(Tag)
export default class TagResolver {
  @Query(() => [Tag])
  async getAllTags() {
    let findOptions: FindManyOptions<Tag> = {
      relations: { ads: true },
    };
    const allTags = await Tag.find(findOptions);
    return allTags;
  }

  @Mutation(() => ID)
  async createTag(@Arg("data") data: TagInput) {
    const tag = Tag.create({ ...data });
    await tag.save();
    return tag.id;
  }
}
