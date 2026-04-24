import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'ChristCornerstone — A Home for Your Faith';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background:
            'radial-gradient(ellipse at 50% 25%, rgba(201,168,76,0.18) 0%, transparent 55%), linear-gradient(180deg, #0a0e1a 0%, #0f1628 100%)',
          color: '#f5efe0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'serif',
          position: 'relative',
        }}
      >
        {/* Top label */}
        <div
          style={{
            fontFamily: 'sans-serif',
            color: '#c9a84c',
            fontSize: 22,
            letterSpacing: 12,
            textTransform: 'uppercase',
            marginBottom: 36,
          }}
        >
          CHRIST · CORNERSTONE
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 104,
            lineHeight: 1.05,
            color: '#f5efe0',
            textAlign: 'center',
            fontWeight: 300,
            letterSpacing: -1,
          }}
        >
          The Case for Christ.
        </div>
        <div
          style={{
            fontSize: 104,
            lineHeight: 1.05,
            color: '#e2c47a',
            textAlign: 'center',
            fontStyle: 'italic',
            fontWeight: 300,
            letterSpacing: -1,
          }}
        >
          The Life of Faith.
        </div>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, margin: '48px 0 32px' }}>
          <div style={{ width: 110, height: 1, background: 'rgba(201,168,76,0.55)' }} />
          <div
            style={{
              width: 10,
              height: 10,
              background: '#c9a84c',
              transform: 'rotate(45deg)',
            }}
          />
          <div style={{ width: 110, height: 1, background: 'rgba(201,168,76,0.55)' }} />
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 32,
            color: '#d4c9b0',
            textAlign: 'center',
            maxWidth: 900,
            lineHeight: 1.4,
          }}
        >
          Truth doesn&apos;t fear questions.
        </div>

        {/* URL footer */}
        <div
          style={{
            position: 'absolute',
            bottom: 50,
            fontFamily: 'sans-serif',
            fontSize: 20,
            color: '#8a6e2f',
            letterSpacing: 6,
            textTransform: 'uppercase',
          }}
        >
          christcornerstone.org
        </div>
      </div>
    ),
    { ...size }
  );
}

