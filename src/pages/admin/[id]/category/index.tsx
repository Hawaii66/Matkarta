import { GetServerSideProps } from "next";
import React from "react";

function index() {
  return (
    <div>
      <h1>What</h1>
    </div>
  );
}

export async function getStaticProps() {
  return {
    redirect: {
      destination: "/admin",
      permanent: true,
    },
  };
}

export default index;
