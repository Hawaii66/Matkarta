import Divider from "@/Components/Utils/Divider";
import { GetShop } from "@/Database/Shop";
import { IsAuthedOnServer } from "@/Functions/AuthedServer";
import { IShop } from "@/Interface/Shop";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSideProps } from "next";
import Link from "next/link";
import React from "react";
import { RiArrowGoBackFill } from "react-icons/ri";

interface Props {
  shop: IShop;
}

function AdminShop({ shop }: Props) {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-11/12 flex flex-col items-center">
        <div className="relative w-full min-w-full flex flex-row justify-center">
          <h1 className="text-lg text-neutral-700 font-bold">{shop.name}</h1>
          <Link className="absolute top-2 left-2" href={"/admin"}>
            <RiArrowGoBackFill />
          </Link>
        </div>
        <Divider />
      </div>
    </div>
  );
}
export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const authed = IsAuthedOnServer(context);
  if (!authed) {
    return {
      redirect: {
        destination: "/admin",
        permanent: true,
      },
    };
  }

  const shop = await GetShop(parseInt(context.query.id?.toString() || ""));

  return {
    props: {
      shop,
    },
  };
};

export default AdminShop;
