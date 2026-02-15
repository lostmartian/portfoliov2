import { ImageResponse } from 'next/og';
import { join } from 'path';
import { readFileSync } from 'fs';

export const dynamic = 'force-static';

export const alt = 'lostmartian Studio - High-End Dev Studio & Design Engineering';
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
                    backgroundImage: 'linear-gradient(to bottom right, #0a0a0f, #1a1a2e)',
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
                    <div
                        style={{
                            fontSize: 36,
                            color: '#a5b4fc',
                            fontWeight: 600,
                            marginBottom: 30,
                        }}
                    >
                        Sahil Gangurde | Full-Stack AI Engineer
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '15px',
                        }}
                    >
                        {['Dev Studio', 'AI Solutions', 'Design Eng'].map((tag) => (
                            <div
                                key={tag}
                                style={{
                                    padding: '10px 25px',
                                    borderRadius: '999px',
                                    background: 'rgba(255,255,255,0.1)',
                                    color: '#e5e7eb',
                                    fontSize: 24,
                                    border: '1px solid rgba(255,255,255,0.1)',
                                }}
                            >
                                {tag}
                            </div>
                        ))}
                    </div>
                </div>

                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '350px',
                        height: '350px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        border: '4px solid rgba(114, 9, 183, 0.5)',
                        boxShadow: '0 0 60px rgba(114, 9, 183, 0.3)',
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
