import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';

export const alt = 'lostmartian - Full-Stack Engineer & AI Architect';
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#030712', // dark background
                    backgroundImage: 'radial-gradient(circle at 25px 25px, #1f2937 2%, transparent 0%), radial-gradient(circle at 75px 75px, #1f2937 2%, transparent 0%)',
                    backgroundSize: '100px 100px',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '40px 80px',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '20px',
                        background: 'rgba(0,0,0,0.5)',
                        boxShadow: '0 0 50px rgba(0,180,216,0.2)',
                    }}
                >
                    <h1
                        style={{
                            fontSize: 80,
                            fontWeight: 900,
                            background: 'linear-gradient(to right, #00b4d8, #7209b7)',
                            backgroundClip: 'text',
                            color: 'transparent',
                            margin: 0,
                            padding: 0,
                            lineHeight: 1.1,
                        }}
                    >
                        lostmartian
                    </h1>
                    <p
                        style={{
                            fontSize: 30,
                            color: '#9ca3af',
                            marginTop: 20,
                            textAlign: 'center',
                            fontWeight: 500,
                        }}
                    >
                        Full-Stack Engineer & AI Architect
                    </p>
                    <div
                        style={{
                            display: 'flex',
                            marginTop: 30,
                            gap: 15,
                        }}
                    >
                        {['React', 'Next.js', 'AI', 'Cloud'].map((tag) => (
                            <div
                                key={tag}
                                style={{
                                    padding: '8px 20px',
                                    borderRadius: '999px',
                                    background: 'rgba(255,255,255,0.1)',
                                    color: '#e5e7eb',
                                    fontSize: 20,
                                    border: '1px solid rgba(255,255,255,0.1)',
                                }}
                            >
                                {tag}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
