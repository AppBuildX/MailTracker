import { GetStarted } from "@/app/components/buttons";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const HomePage = async () => {
  const session = await getServerSession(authOptions);
  return (
    <main className="bg-white">
      <div className="flex flex-col justify-center items-center px-4 mx-auto sm:px-6 lg:px-8  h-[80vh]">
        <div>
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-5xl">
              Track your emails with ease
            </h2>

            <p className="max-w-screen-md mx-auto mt-4 text-gray-500">
              Enhance your email strategy with seamless tracking of delivery,
              opens, and engagement. Unlock valuable insights to optimize
              campaigns and achieve exceptional email performance.
            </p>

            {!session && <GetStarted />}
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
