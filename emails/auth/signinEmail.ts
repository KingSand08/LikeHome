// import { EmailTemplate } from '@/components/email-template';
// import { Resend } from 'resend';

// const resend = new Resend(process.env.RESEND_API_KEY);

// export async function POST() {
//     const { data, error } = await resend.emails.send({
//         from: 'onboarding@resend.dev',
//         to: 'delivered@resend.dev',
//         subject: 'Hello world',
//         react: EmailTemplate({ firstName: 'John' }),
//     });

//     if (error) {
//         return Response.json({ error });
//     }

//     return Response.json(data);
// }
