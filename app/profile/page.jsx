import { redirect } from "next/navigation";

import Profile from "@/components/Profile";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";

async function getData(session) {
  "use server";
  const res = await fetch(
    `http:localhost:3000/api/users/${session?.user.id}/posts`
  );

  return res.json();
}

const MyProfile = async () => {
  const session = await getServerSession(authOptions);
  const myPosts = await getData(session);

  const handleEdit = async (post) => {
    "use server";
    revalidatePath("/profile");
    redirect(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (id) => {
    "use server";
    try {
      await fetch(`http://localhost:3000/api/prompt/${id}`, {
        method: "DELETE",
      });

      revalidatePath("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination"
      data={myPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
