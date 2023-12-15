import { FetchCategoryResult } from "@/utils/firebaseUtil";
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
import Link from "next/link";
import { GoThreeBars } from "react-icons/go";

interface INoteCategorySelectorProps {
  category: string;
  categoryArr: FetchCategoryResult[];
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
