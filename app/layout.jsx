import "@/styles/globals.css";
import Nav from "@/components/Nav";
import Provider from "@/components/Provider";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export const metadata = {
  title: "Prompt Forge",
  description: "A collection of AI prompts.",
};

const RootLayout = async ({ children }) => {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient" />
        </div>
        <main className="app">
          <Provider>
            <Nav session={session} />
            {children}
          </Provider>
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
