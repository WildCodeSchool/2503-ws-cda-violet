import { FormEvent } from "react";
import { NewUserInput, useSignupMutation } from "../generated/graphql-types";
import { toast } from "react-toastify";
import { useCurrentUser, useLogin } from "../zustand/userStore";

export function LaboPage() {
  // ✅ formulaire
  // ✅ appeler le backend
  // ✅ store global
  const [signup] = useSignupMutation();
  const user = useCurrentUser();
  const loginToStore = useLogin();

  const hSubmit = async (evt: FormEvent) => {
    evt.preventDefault();
    const form = evt.target;
    const formData = new FormData(form as HTMLFormElement);
    const formJson = Object.fromEntries(formData.entries());

    try {
      const { data } = await signup({
        variables: { data: formJson as NewUserInput },
      });
      if (!data) throw new Error("Missing data");
      const publicProfile = JSON.parse(data.signup);
      loginToStore(publicProfile);
      toast.success(`Salut ${publicProfile.email}`);
    } catch {
      toast.error("oops");
    }
  };

  return (
    <>
      <h1>Authentification</h1>
      <form onSubmit={hSubmit}>
        <input type="text" name="email" />
        <input type="password" name="password" />
        <input type="submit" value="S'inscrire" />
      </form>
      <h2>Test Zustand</h2>
      <p>User: {user?.email}</p>
    </>
  );
}
