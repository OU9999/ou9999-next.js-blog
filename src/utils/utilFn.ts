import {
  algoThumbnail,
  blogThumbnail,
  cssThumbnail,
  jsThumbnail,
  nextThumbnail,
  reactThumbnail,
  tsThumbnail,
} from "@/constants/basicThumbnail";
import markdownToTxt from "markdown-to-txt";

export const vhToPixels = (vh: number) => {
  if (typeof window !== "undefined") {
    return Math.round(window.innerHeight / (100 / vh));
  }
};

export const dateFormatter = (time: number | Date) => {
  const options: any = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const formattedDateKR = new Intl.DateTimeFormat("ko-KR", options).format(
    time
  );
  return formattedDateKR;
};

export const dateFormatterMobile = (time: number | Date) => {
  const oldDate = new Date(time);
  const now = new Date();
  const diffTime = now.getTime() - oldDate.getTime();
  const diffDay = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDay === 0) {
    return oldDate.toLocaleString("ko-KR", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  } else if (diffDay < 365) {
    return oldDate.toLocaleString("ko-KR", {
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  } else {
    return oldDate.toLocaleString("ko-KR", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  }
};

export const selectBasicThumbnail = (category: string) => {
  switch (category) {
    case "React":
      return reactThumbnail;
    case "JavaScript":
      return jsThumbnail;
    case "TypeScript":
      return tsThumbnail;
    case "Algorithms":
      return algoThumbnail;
    case "CSS":
      return cssThumbnail;
    case "Next.js":
      return nextThumbnail;
    case "My First Blog":
      return blogThumbnail;
    default:
      return reactThumbnail;
  }
};

export const returnColors = (colorTheme: string) => {
  //[light,dark,HeaderBgColor]
  switch (colorTheme) {
    case "purple":
      return ["#7F5AD5", "#C7A8F7", "rgba(162, 155, 254,0.9)"];
    case "teal":
      return ["#319795", "#81E6D9", "rgba(85, 239, 196,0.9)"];
    case "cyan":
      return ["#00B5D8", "#9DECF9", "rgba(129, 236, 236,0.9)"];

    default:
      return ["#7F5AD5", "#C7A8F7", "rgba(236, 240, 241,0.9)"];
  }
};

export const returnUrlTitle = (title: string) => {
  const setOne = title.replaceAll(" ", "-");
  const setTwo = setOne.replaceAll("/", "-");
  const setThree = setTwo.replaceAll("?", "");
  return setThree;
};

export const returnLinkTitle = (title: string) => {
  const setOne = title.replaceAll(" ", "-");
  const setTwo = setOne.replaceAll("/", "");
  const setThree = setTwo.replaceAll(".", "");
  const setFour = setThree.replaceAll("!", "");
  const setFive = setFour.replaceAll("?", "");
  const setSix = setFive.replaceAll("💻", "");
  const setSeven = setSix.replaceAll("(", "");
  const setEight = setSeven.replaceAll(")", "");
  return setEight.toLowerCase();
};

export const returnDescription = (md: string) => {
  return markdownToTxt(md).substring(0, 150) + "...";
};
