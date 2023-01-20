import Link from "next/link";
import React from "react";
import { RiArrowGoBackFill } from "react-icons/ri";
import Divider from "../Utils/Divider";

interface Props {
  title: string;
  category: string;
  description: string;
  backLink: string;
}

function Header({ title, backLink, category, description }: Props) {
  return (
    <div className="w-full flex flex-col items-center justify-center my-4">
      <div className="w-11/12 relative flex items-center">
        <Link href={backLink} className="absolute text-2xl">
          <RiArrowGoBackFill />
        </Link>
        <h1 className="text-center w-full text-2xl font-bold text-neutral-700">
          {title}
        </h1>
      </div>
      <Divider />
      <h3 className="text-center w-full text-lg font-bold text-neutral-700">
        {"<"}
        {category}
        {">"}
      </h3>
      <p className="w-4/5 text-left text-normal font-normal text-neutral-700">
        {description}
      </p>
    </div>
  );
}

export default Header;
