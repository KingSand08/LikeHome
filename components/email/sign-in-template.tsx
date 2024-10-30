import { Body, Container, Head, Hr, Html, Row, Section, Tailwind } from "@react-email/components";
import { Img } from "@react-email/img";
import { Text } from "@react-email/text";
import { Link } from "@react-email/link";
import React from "react";

interface Props {
    content: string;
}

const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "";

export const SignInEmail = ({ content }: Props) => {
    return (
        <Html>
            <Head />
            <Tailwind>
                <Body className="font-sans text-gray-800 bg-slate-200">
                    <Container>
                        <Img
                            src={`${baseUrl}/static/email-header.png`}
                            width="100%"
                            height="auto"
                            alt="EXAMPLE HEADER"
                        />
                        <Section className="mx-6 my-6 text-[16px] leading-[23px]">
                            <Text>
                                {content}
                            </Text>
                            <Hr />
                            <Row>
                                <Text>
                                    Thank you for working with LikeHome!
                                </Text>
                                <Link href="https://google.com">Example Link to Google.com</Link>
                            </Row>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

export default SignInEmail;