import { Button } from "@chakra-ui/react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

interface IHomeIconButtonProps {
  icon: JSX.Element;
  colorScheme: string;
  link?: string;
  clicked?: () => void;
}

export default function HomeIconButton({
  icon,
  colorScheme,
  link,
  clicked,
}: IHomeIconButtonProps) {
  return (
    <>
      <Button
        aria-label={colorScheme}
        fontSize={{
          md: "2xl",
          lg: "3xl",
          xl: "4xl",
        }}
        variant="ghost"
        px={"3"}
        py={"8"}
        colorScheme={colorScheme}
        onClick={clicked ? clicked : () => {}}
      >
        {clicked ? (
          icon
        ) : (
          <Link href={link!} target="_blank">
            {icon}
          </Link>
        )}
      </Button>
    </>
  );
}
