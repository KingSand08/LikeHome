export default function PaymentSuccess({
    searchParams: { amount },
  }: {
    searchParams: { amount: string };
  }) {
    return (
      <main className="max-w-3xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-teal-500 to-purple-500">
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold mb-2">Thank you!</h1>
          <h2 className="text-2xl">Enjoy Your Stay!</h2>
        </div>
      </main>
    );
  }