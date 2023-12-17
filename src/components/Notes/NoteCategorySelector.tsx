import { ICategoryArr } from "@/firebase/firebaseTypes";
import { FetchCategoryResult } from "@/firebase/firebaseUtil";
import {
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  HStack,
  Box,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { GoThreeBars } from "react-icons/go";

interface INoteCategorySelectorProps {
  category: string;
  categoryArr: FetchCategoryResult[];
}

export default function NoteCategorySelector({
  category,
  categoryArr,
}: INoteCategorySelectorProps) {
  return (
    <>
      <HStack
        gap={3}
        my={"10"}
        border={"1px solid"}
        padding={"10"}
        rounded={"2xl"}
      >
        <Heading>Category : {category}</Heading>
        <Box>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<GoThreeBars />}
              variant="outline"
            />
            <MenuList>
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
