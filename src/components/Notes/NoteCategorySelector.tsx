import { ICategorys, allCategory } from "@/pages/notes/[category]";
import { dbService } from "@/utils/firebase";
import {
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  HStack,
  Box,
} from "@chakra-ui/react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GoThreeBars } from "react-icons/go";

interface INoteCategorySelectorProps {
  category: string;
}

export default function NoteCategorySelector({
  category,
}: INoteCategorySelectorProps) {
  const [categorys, setCategorys] = useState<ICategorys[]>([]);

  const getCategorys = async () => {
    const q = query(
      collection(dbService, "categorys"),
      orderBy("createdAt", "asc")
    );
    onSnapshot(q, (snapshot) => {
      const categoryArr: any = snapshot.docs.map((category) => ({
        id: category.id + "",
        ...category.data(),
      }));
      setCategorys([allCategory, ...categoryArr]);
    });
  };

  useEffect(() => {
    getCategorys();
  }, []);

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
              {categorys.map((category) => (
                <>
                  <Link href={`/notes/${category.category}`}>
                    <MenuItem
                      key={category.id}
                      value={category.category}
                      px={"7"}
                    >
                      {category.category}
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
