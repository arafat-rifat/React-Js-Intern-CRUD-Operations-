import { CustomContainer } from "../ui";

import Image from "next/image";
import logo from "../../assets/logo.svg";

export default function Header() {
  return (
    <>
      <header className="py-5 shadow-md">
        <CustomContainer>
          <Image src={logo} alt="logo" height="40" width="80px" />
        </CustomContainer>
      </header>
    </>
  );
}
