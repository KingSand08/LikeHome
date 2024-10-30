import { NextResponse } from 'next/server';
import { EmailTemplate } from '../../../components/email/email-template';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
    try {
        const emails = ['test@gmail.com'];

        const emailPromises = [...new Set(emails)]
            .map((recipientEmail) => {
                return resend.emails.send({
                    from: 'Acme <onboarding@resend.dev>',
                    // from: 'stellar.horizons@likehome.biz',
                    to: recipientEmail,
                    // replyTo: 'support@likehome.biz',
                    subject: 'Hello world',
                    react: EmailTemplate({ firstName: 'NAME HERE' }),
                });
            })

        const responses = await Promise.all(emailPromises);

        return NextResponse.json({
            status: 200,
            responses
        });
    } catch (error) {
        return NextResponse.json({ error });
    }
}
