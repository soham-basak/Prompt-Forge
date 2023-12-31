import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SubmitBtn from "@/app/create-prompt/SubmitBtn";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";

const createPromptAction = async (formData) => {
  "use server";

  const session = await getServerSession(authOptions);

  const prompt = formData.get("prompt")?.toString();
  const tag = formData.get("tag")?.toString();

  try {
    if (!prompt || !tag) return;

    await fetch(`${process.env.NEXTAUTH_URI_INTERNAL}/api/prompt/new`, {
      method: "POST",
      body: JSON.stringify({
        prompt,
        userId: session?.user.id,
        tag,
      }),
    });

    revalidatePath("/");
  } catch (err) {
    console.log(err);
  } finally {
    redirect("/");
  }
};

const Form = ({ type }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform
      </p>

      <form
        action={createPromptAction}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <lable>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI Prompt
          </span>

          <textarea
            name="prompt"
            placeholder="Write your prompt here..."
            required
            className="form_textarea"
          ></textarea>
        </lable>

        <lable>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag {` `}
            <span className="font-normal text-slate-400">(#webdev, #idea)</span>
          </span>

          <input
            name="tag"
            placeholder="#tag"
            required
            className="form_input"
          ></input>
        </lable>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>
          <SubmitBtn type={type} />
        </div>
      </form>
    </section>
  );
};

export default Form;
