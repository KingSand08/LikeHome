import DOMPurify from "dompurify";

type HTMLSafeDescriptionProps = {
  html: string | undefined;
};

const HTMLSafeDescription = ({ html }: HTMLSafeDescriptionProps) => {
  const sanitizedDescription = DOMPurify.sanitize(
    html || "No description available"
  );

  return (
    <div
      className="text-md mb-2"
      dangerouslySetInnerHTML={{
        __html: sanitizedDescription,
      }}
    ></div>
  );
};

export default HTMLSafeDescription;
