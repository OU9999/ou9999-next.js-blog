import ReCAPTCHA from "react-google-recaptcha";

const sitekey = String(process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_KEY);

const CommentReCAPTCHA = () => {
  return <ReCAPTCHA sitekey={sitekey} />;
};

export default CommentReCAPTCHA;
