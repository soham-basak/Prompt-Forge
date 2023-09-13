"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useTransition } from "react";
import { updatePromptAction } from "./actions";

const UpdateForm = ({ type }) => {
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();

  const id = searchParams.get("id");

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
        action={(formData) =>
          startTransition(async () => {
            await updatePromptAction(formData, id);
          })
        }
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

          <button
            type="submit"
            disabled={isPending}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {isPending ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default UpdateForm;
