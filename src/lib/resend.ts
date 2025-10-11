import { Resend } from "resend";
import { EmailTemplate } from "@/components/email/EmailTemplate";

const resend = new Resend(process.env.RESEND_TOKEN);

interface SendMagicLinkParams {
  data: {
    email: string;

    url: string;
  };
}

const sendMagicLink = async ({ data }: SendMagicLinkParams) => {
  const { email, url } = data;
  await resend.emails.send({
    from: "Content Creator App <onboarding@emiliorivero.com>",
    to: email,
    subject: "Login to your account",
    react: EmailTemplate({ url }),
  });
};

export { sendMagicLink };

export default resend;
