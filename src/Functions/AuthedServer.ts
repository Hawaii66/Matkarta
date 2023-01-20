import { Database } from "@/Interface/Supabase";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

export const IsAuthedOnServer = async (ctx: GetServerSidePropsContext) => {
  const {
    data: { session },
  } = await createServerSupabaseClient(ctx).auth.getSession();

  return session;
};
