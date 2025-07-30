import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Field, ObjectType, registerEnumType } from "type-graphql";

// exemples de Role: USER, ADMIN
// exemples de Right: CAN_EDIT_ADS, CAN_DELETE_USERS, CAN_CRUD_COMMENTS
// Role ADMIN a tous les Right
// Role INSTRUCTOR a certains Right

export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}
registerEnumType(Role, {
  name: "Roles",
  description: "Roles for users in this app",
});

@Entity()
@ObjectType()
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column({ unique: true })
  @Field()
  email: string;

  @Column()
  @Field()
  hashedPassword: string;

  @Column({ type: "enum", enum: Role, array: true, default: [Role.USER] })
  @Field(() => [Role])
  roles: Role[];
}

export default User;
