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
                    backgroundColor: '#030712',
                    backgroundImage: 'linear-gradient(to bottom right, #0a0a0f, #1a1a2e)',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 200,
                        height: 200,
                        borderRadius: '50%',
                        background: 'linear-gradient(to bottom right, #00b4d8, #7209b7)',
                        marginBottom: 40,
                        boxShadow: '0 0 60px rgba(114, 9, 183, 0.5)',
                    }}
                >
                    <div
                        style={{
                            fontSize: 100,
                            color: 'white',
                            fontWeight: 'bold',
                        }}
                    >
                        LM
                    </div>
                </div>
                <h1
                    style={{
                        fontSize: 70,
                        fontWeight: 900,
                        color: 'white',
                        margin: 0,
                        marginBottom: 10,
                    }}
                >
                    lostmartian
                </h1>
                <p
                    style={{
                        fontSize: 30,
                        color: '#a5b4fc',
                        margin: 0,
                    }}
                >
                    Building the Future with AI & Code
                </p>
            </div>
        ),
        {
            ...size,
        }
    );
}
