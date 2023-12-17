import { IconButton, Tooltip } from "@chakra-ui/react";
import { FaCommentSlash } from "react-icons/fa";

interface ICommentToolTipProps {
  label: string;
  ariaLabel: string;
  clickFn: () => void;
  icon: JSX.Element;
}

const CommentToolTip = ({
  label,
  ariaLabel,
  clickFn,
  icon,
}: ICommentToolTipProps) => {
  return (
    <>
      <Tooltip label={label} aria-label={ariaLabel} placement="top">
        <IconButton
          fontSize={"xl"}
          aria-label={ariaLabel}
          variant="ghost"
          onClick={clickFn}
        >
          {icon}
        </IconButton>
      </Tooltip>
    </>
  );
};

export default CommentToolTip;
