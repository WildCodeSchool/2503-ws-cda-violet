import { SubmitHandler, useForm } from "react-hook-form";
import {
  AdInput,
  useCreateAdMutation,
  useGetAllCategoriesAndTagsQuery,
} from "../generated/graphql-types";

const NewAdForm = () => {
  const { error, loading, data } = useGetAllCategoriesAndTagsQuery();
  const [createAd] = useCreateAdMutation();
  const { register, handleSubmit } = useForm<AdInput>();

  const onSubmit: SubmitHandler<AdInput> = async (data) => {
    const sanitizedData = { ...data, price: Number(data.price) };
    await createAd({
      variables: { data: sanitizedData },
    });
  };

  if (loading) return <p>Wait for it...</p>;
  if (error) return <p>Woops, on a tout cassé</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Titre
        <input
          defaultValue={"Je vends ma 206"}
          {...register("title", { required: true })}
        />
      </label>

      <br />

      <label>
        Description
        <input
          defaultValue={"Ma 206 est super"}
          {...register("description", { required: true })}
        />
      </label>

      <br />

      <label>
        Vendeur
        <input
          defaultValue={"John Doe"}
          {...register("owner", { required: true })}
        />
      </label>

      <br />

      <label>
        Ville
        <input
          defaultValue={"Paris"}
          {...register("location", { required: true })}
        />
      </label>

      <br />

      <label>
        Image
        <input
          defaultValue={
            "https://www.actuauto.fr/wp-content/uploads/2021/01/Peugeot-206-scaled.jpg"
          }
          {...register("picture", { required: true })}
        />
      </label>

      <br />

      <label>
        Prix
        <input
          type="number"
          defaultValue={4000}
          {...register("price", { required: true })}
        />
      </label>

      <br />

      <label>
        Categorie
        <select {...register("category", { required: true })}>
          {data?.getAllCategories.map((el) => (
            <option value={el.id} key={el.id}>
              {el.title}
            </option>
          ))}
        </select>
      </label>

      <br />
      {data?.getAllTags.map((el) => (
        <div key={el.id}>
          <label>
            {el.title}
            <input value={el.id} type="checkbox" {...register("tags")} />
          </label>
        </div>
      ))}

      <input type="submit" />
    </form>
  );
};
export default NewAdForm;
