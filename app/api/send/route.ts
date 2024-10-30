import { NextResponse } from 'next/server';
import { SignInEmail } from '@/components/email/sign-in-template';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
    try {
        const emails = ['clinvil2@gmail.com'];

        const emailPromises = [...new Set(emails)]
            .map((recipientEmail) => {
                return resend.emails.send({
                    from: 'LikeHome <onboarding@resend.dev>',
                    // from: 'LikeHome <stellar.horizons@likehome.biz>', //waiting for DNS approval
                    to: recipientEmail,
                    // replyTo: 'LikeHome Support <support@likehome.biz>', //waiting for DNS approval
                    subject: 'LikeHome Hotels Sign in',
                    react: SignInEmail({ content: '<LINK TO SIGN IN HERE>' }), //waiting for DNS approval
                    // react: EmailTemplate({ firstName: 'NAME HERE' }),
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
