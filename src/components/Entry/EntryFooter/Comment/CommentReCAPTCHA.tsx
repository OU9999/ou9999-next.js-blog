import ReCAPTCHA from "react-google-recaptcha";

const sitekey = String(process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_KEY);

interface ICommentRecaptchaProps {
  onChange: () => void;
}

const CommentRecaptcha = ({ onChange }: ICommentRecaptchaProps) => {
  return <ReCAPTCHA sitekey={sitekey} onChange={onChange} />;
};

export default CommentRecaptcha;
