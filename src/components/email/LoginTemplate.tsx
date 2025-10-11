interface EmailTemplateProps {
  url: string;
}

export function EmailTemplate({ url }: EmailTemplateProps) {
  return (
    <div>
      <h1>Welcome to the Content Creator App</h1>
      <p>
        Click <a href={url}>here</a> to login to your account.
      </p>
    </div>
  );
}
