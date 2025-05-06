import Image from "next/image";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/header";

export default function Test() {
  return (
    <div>
      <Button>Button Text</Button>
      <Button variant="white">Button Text</Button>
      <Button variant="black" outline="default">
        Button Textg
        <Image
          src="/images/icon-check-wh.svg"
          alt="logo"
          width={12}
          height={12}
        />
      </Button>
      <hr />
      <Header />
    </div>
  );
}
