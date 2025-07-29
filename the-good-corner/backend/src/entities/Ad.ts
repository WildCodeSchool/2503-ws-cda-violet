import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Category from "./Category";
import Tag from "./Tag";
import { Field, ObjectType } from "type-graphql";

@Entity()
@ObjectType()
class Ad extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  title: string;

  @Column()
  @Field()
  description: string;

  @Column()
  @Field()
  owner: string;

  @Column()
  @Field()
  price: number;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @Column()
  @Field()
  picture: string;

  @Column()
  @Field()
  location: string;

  @ManyToOne(() => Category, (category) => category.ads, { eager: true })
  @Field(() => Category)
  category: Category;

  @ManyToMany(() => Tag, (tag) => tag.ads, { eager: true })
  @JoinTable()
  @Field(() => [Tag])
  tags: Tag[];
}

export default Ad;
