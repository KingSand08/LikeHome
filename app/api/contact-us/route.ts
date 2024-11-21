export async function POST(req: Request) {
  console.log("Contact form submitted");
  const formData = await req.formData();
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;
  console.log("Contact form submitted", { name, email, message });

  return new Response("Contact us form submitted successfully", {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
