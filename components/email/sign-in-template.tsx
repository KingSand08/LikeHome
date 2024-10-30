import * as React from 'react';

interface EmailTemplateProps {
    firstName: string;
}

export const SignInEmail: React.FC<Readonly<EmailTemplateProps>> = ({
    firstName,
}) => (
    <div>
        <h1>Welcome, {firstName}!</h1>
        <h2>Sign in at this link:</h2>
        <p>LINK HERE</p>
    </div>
);
