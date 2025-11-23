import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Hobbies',
};

export default function HobbiesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
