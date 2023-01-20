import AdminShop from "@/Components/Admin/AdminShop";
import Divider from "@/Components/Utils/Divider";
import { GetShop } from "@/Database/Shop";
import { IsAuthedOnServer } from "@/Functions/AuthedServer";
import { SaveShop } from "@/Functions/SaveShop";
import { IShop } from "@/Interface/Shop";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSideProps } from "next";
import { useState } from "react";

interface Props {
  shop: IShop;
}

function Index({ shop }: Props) {
  const [localShop, setLocalShop] = useState(shop);
  const [loading, setLoading] = useState(false);

  const save = async (shop: IShop) => {
    setLoading(true);
    const newShop = await SaveShop(shop);
    setLocalShop(newShop);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="w-full min-h-full flex items-center justify-center">
        <h1>Laddar</h1>
      </div>
    );
  }

  return <AdminShop shop={localShop} save={save} />;
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

export default Index;
