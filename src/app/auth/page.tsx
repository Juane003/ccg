import LoginForm from "@/components/auth/LoginForm";
import GradientText from "@/components/GradientText";

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <div className="border border-primary/30 rounded-xl p-8 max-w-sm w-full">
        <GradientText
          as="h1"
          className="text-3xl font-bold text-center mb-6"
          gradientClassNames={{
            from: "from-blue-500",
            via: "via-green-500",
            to: "to-indigo-500",
          }}
        >
          CCG
        </GradientText>

        <LoginForm />
        <p className=" text-xs text-muted-foreground mt-4">
          You will receive an email with a link to login to your account.
        </p>
      </div>
    </div>
  );
};

export default Login;
