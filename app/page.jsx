import Feed from "@/components/Feed";

export const dynamic = "force-dynamic";

const fetchPosts = async () => {
  const res = await fetch(`${process.env.NEXTAUTH_URI_INTERNAL}/api/prompt`);

  if (!res.ok) {
    throw new Error("failed to get data from servers");
  }

  return res.json();
};

const Home = async () => {
  const allPosts = await fetchPosts();

  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">AI-Powered Prompts</span>
      </h1>
      <p className="desc text-center">
        Prompt Forge: AI prompts for modern creativity. Discover, create, share.
        Your creative companion.
      </p>
      <Feed allPosts={allPosts} />
    </section>
  );
};

export default Home;
