import { redirect } from "next/navigation";

import Profile from "@/components/Profile";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";

async function getData(session) {
  const res = await fetch(
    `${process.env.NEXTAUTH_URI_INTERNAL}/api/users/${session?.user.id}/posts`
  );

  if (!res.ok) {
    throw new Error("failed to get data from servers!");
  }

  return res.json();
}

const handleDelete = async (id) => {
  "use server";

  try {
    await fetch(`${process.env.NEXTAUTH_URI_INTERNAL}/api/prompt/${id}`, {
      method: "DELETE",
    });

    revalidatePath("/profile");
  } catch (error) {
    console.log(error);
  }
};

const MyProfile = async () => {
  const session = await getServerSession(authOptions);
  const myPosts = await getData(session);

  const handleEdit = async (post) => {
    "use server";
    revalidatePath("/profile");
    redirect(`/update-prompt?id=${post._id}`);
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination"
      data={myPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      session={session}
    />
  );
};

export default MyProfile;
