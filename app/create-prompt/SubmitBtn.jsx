"use client";

import { experimental_useFormStatus as useFormStatus } from "react-dom";

const SubmitBtn = ({ type }) => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
    >
      {pending ? `${type}...` : type}
    </button>
  );
};

export default SubmitBtn;
