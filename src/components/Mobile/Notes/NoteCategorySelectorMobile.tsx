import { ICategorys } from "@/pages/notes/[category]";
import { dbService } from "@/utils/firebase";
import {
  Box,
  HStack,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GoThreeBars } from "react-icons/go";

interface INoteCategorySelectorProps {
  category: string;
  categoryArr: ICategorys[];
}

export default function NoteCategorySelectorMobile({
  category,
  categoryArr,
}: INoteCategorySelectorProps) {
  return (
    <>
      <HStack
        gap={3}
        my={"10"}
        border={"1px solid"}
        padding={"5"}
        rounded={"2xl"}
      >
        <Heading fontSize={"xl"}>Category : {category}</Heading>
        <Box>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<GoThreeBars />}
              variant="outline"
            />
            <MenuList zIndex={99}>
              {categoryArr.map((category) => (
                <>
                  <Link href={`/notes/${category.category}`}>
                    <MenuItem
                      key={category.id}
                      value={category.category}
                      px={"7"}
                    >
                      <Text>{category.category}</Text>
                      <Text marginLeft={1} color={"gray"}>
                        ({category.size})
                      </Text>
                    </MenuItem>
                  </Link>
                </>
              ))}
            </MenuList>
          </Menu>
        </Box>
      </HStack>
    </>
  );
}
