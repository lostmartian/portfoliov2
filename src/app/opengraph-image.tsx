import { ImageResponse } from 'next/og';
import { join } from 'path';
import { readFileSync } from 'fs';

export const dynamic = 'force-static';

export const alt = 'lostmartian - Full-Stack Engineer & AI Architect';
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
    // Read the profile picture
    const profilePicPath = join(process.cwd(), 'public/images/Screenshot 2025-11-23 at 7.43.08 PM.png');
    const profilePic = readFileSync(profilePicPath);

    // Convert Buffer to ArrayBuffer for ImageResponse
    const profilePicBuffer = profilePic.buffer.slice(
        profilePic.byteOffset,
        profilePic.byteOffset + profilePic.byteLength
    );

    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: '#030712',
                    backgroundImage: 'radial-gradient(circle at 25px 25px, #1f2937 2%, transparent 0%), radial-gradient(circle at 75px 75px, #1f2937 2%, transparent 0%)',
                    backgroundSize: '100px 100px',
                    padding: '60px',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        flex: 1,
                        paddingRight: '40px',
                    }}
                >
                    <div
                        style={{
                            fontSize: 24,
                            color: '#00b4d8',
                            marginBottom: 10,
                            fontWeight: 600,
                            letterSpacing: '0.05em',
                            textTransform: 'uppercase',
                        }}
                    >
                        Portfolio
                    </div>
                    <h1
                        style={{
                            fontSize: 80,
                            fontWeight: 900,
                            color: 'white',
                            margin: 0,
                            padding: 0,
                            lineHeight: 1.1,
                            marginBottom: 20,
                        }}
                    >
                        Sahil Gangurde
                    </h1>
                    <div
                        style={{
                            fontSize: 40,
                            background: 'linear-gradient(to right, #00b4d8, #7209b7)',
                            backgroundClip: 'text',
                            color: 'transparent',
                            fontWeight: 700,
                            marginBottom: 30,
                        }}
                    >
                        @lostmartian
                    </div>
                    <p
                        style={{
                            fontSize: 28,
                            color: '#9ca3af',
                            margin: 0,
                            fontWeight: 400,
                            lineHeight: 1.5,
                        }}
                    >
                        Full-Stack Engineer & AI Architect building intelligent systems.
                    </p>
                </div>

                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '400px',
                        height: '400px',
                        borderRadius: '40px',
                        overflow: 'hidden',
                        border: '4px solid rgba(0, 180, 216, 0.3)',
                        boxShadow: '0 0 80px rgba(0, 180, 216, 0.2)',
                        background: '#111',
                    }}
                >
                    {/* @ts-ignore */}
                    <img
                        src={profilePicBuffer as any}
                        alt="Sahil Gangurde"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                    />
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
