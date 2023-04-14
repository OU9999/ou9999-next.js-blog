import LoadingCardMobile from "./LoadingCardMobile";

export default function LoadingGridMobile() {
  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => (
        <LoadingCardMobile key={index} />
      ))}
    </>
  );
}
