import React from "react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSupabase } from "@/Hooks/useSupabase";
import { useUser } from "@supabase/auth-helpers-react";
import { useAdminShops } from "@/Hooks/useAdminShops";
import { AiOutlineArrowRight, AiOutlineLogout } from "react-icons/ai";
import Link from "next/link";
import Divider from "@/Components/Utils/Divider";

function Index() {
  const user = useUser();
  const supabase = useSupabase();
  const shops = useAdminShops(user?.id || "");

  if (!user) {
    return (
      <div className="flex flex-col items-center">
        <div className="w-11/12">
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
            }}
          />
        </div>
      </div>
    );
  }
  return (
    <div className="w-full flex items-center flex-col">
      <div className="w-11/12 md:w-1/2 flex flex-col items-center mt-4">
        <p className="text-lg font-bold text-neutral-700">Inloggad som: </p>
        <p className="text-lg font-bold text-neutral-700">{user.email}</p>
        <button
          className="mx-4 my-2 px-2 py-1 bg-red-500 rounded flex flex-row text-lg justify-between items-center"
          onClick={() => supabase.auth.signOut()}
        >
          Sign out
          <AiOutlineLogout className="text-lg ml-4" />
        </button>
        <Divider />
        <div className="flex flex-col items-center mt-4">
          {shops.map((shop) => (
            <Link
              key={shop.id}
              href={`/admin/${shop.id}`}
              className="flex flex-col mb-4 w-3/5 p-4 drop-shadow-card bg-neutral-50 rounded"
            >
              <img src={shop.images[0]} />
              <div className="flex flex-row justify-between items-center">
                <h1 className="text-lg font-bold text-neutral-700">
                  {shop.name}
                </h1>
                <AiOutlineArrowRight className="text-lg" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Index;
