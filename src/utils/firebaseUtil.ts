import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { dbService } from "./firebase";
import { ICategoryArr, IDetail, INotesArr } from "./firebaseTypes";

interface FetchNotesResult {
  notesArr: INotesArr[];
  snapsize: number;
}

export const fetchNotesArr = async (
  category: string
): Promise<FetchNotesResult> => {
  let q;
  if (category === "ALL") {
    q = query(collection(dbService, "notes"), orderBy("createdAt", "desc"));
  } else {
    q = query(
      collection(dbService, "notes"),
      where("category", "==", category),
      orderBy("createdAt", "desc")
    );
  }

  const snapshot = await getDocs(q);
  const snapsize: number = snapshot.size;
  const notesArr: INotesArr[] = snapshot.docs.map((note) => ({
    id: note.id + "",
    title: note.data().title,
    category: note.data().category,
    createdAt: note.data().createdAt,
    thumbnailUrl: note.data().thumbnailUrl,
    description: note.data().description,
  }));

  return { notesArr, snapsize };
};

export interface FetchCategoryResult {
  id?: string;
  category?: string;
  size?: number;
  createdAt?: number;
}

type fetchCategoryOption = "ALL" | "snapshot";

export const fetchCategory = async (
  option: fetchCategoryOption
): Promise<FetchCategoryResult[]> => {
  const q = query(
    collection(dbService, "categorys"),
    orderBy("createdAt", "asc")
  );
  const snapshot = await getDocs(q);
  const categoryArr: ICategoryArr[] = snapshot.docs.map((category) => ({
    id: category.id + "",
    ...category.data(),
  }));

  if (option === "snapshot") {
    return categoryArr;
  }

  // categorySizes
  const categorySizePromises = categoryArr.map(async (c: ICategoryArr) => {
    const categorySnapshot = await getDocs(
      query(collection(dbService, "notes"), where("category", "==", c.category))
    );
    return {
      id: c.id,
      category: c.category,
      size: categorySnapshot.size,
      createdAt: c.createdAt,
    };
  });

  const allQ = query(
    collection(dbService, "notes"),
    orderBy("createdAt", "desc")
  );
  const allSnapshot = await getDocs(allQ);
  const allSnapsize = allSnapshot.size;
  const allCategory = {
    id: "1",
    category: "ALL",
    size: allSnapsize,
    createdAt: 1,
  };

  const categoryArrIncludeAll = await Promise.all([
    allCategory,
    ...categorySizePromises,
  ]);

  return categoryArrIncludeAll;
};

export const fetchDetail = async (docId: string): Promise<IDetail> => {
  const ref = await doc(dbService, "notes", docId);
  const snap = await getDoc(ref);
  const snapData: any = await snap.data();
  const detail: IDetail = snapData;

  return detail;
};
