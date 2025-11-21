import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Shriprasad R Patil - Full-Stack Developer'
export const size = {
    width: 1200,
    height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 60,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontFamily: 'system-ui',
                }}
            >
                <div style={{ fontSize: 80, fontWeight: 'bold', marginBottom: 20 }}>
                    Shriprasad R Patil
                </div>
                <div style={{ fontSize: 40, opacity: 0.9 }}>
                    Full-Stack Developer
                </div>
                <div style={{ fontSize: 30, opacity: 0.8, marginTop: 20 }}>
                    MERN Stack | Python | LangChain
                </div>
            </div>
        ),
        {
            ...size,
        }
    )
}
