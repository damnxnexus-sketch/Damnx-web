import Link from 'next/link';

export default async function BlogsPage() {
    const API_KEY = "AIzaSyDn5cj05lYmGwIr-Sf8VJcqlOWGRv1Wtv0";
    const BLOG_ID = "2979434833167806285";

    let posts = [];
    try {
        const res = await fetch(
            `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}`,
            { next: { revalidate: 3600 } }
        );
        if (res.ok) {
            const data = await res.json();
            posts = data.items || [];
        } else {
            console.error("Failed to fetch blogs");
        }
    } catch (error) {
        console.error("Error connecting to Blogger API:", error);
    }

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500&display=swap');

        :root {
          --red: #c0392b;
          --red-bright: #e74c3c;
          --red-muted: #7b1c14;
          --black: #080808;
          --surface: #111111;
          --surface-2: #181818;
          --border: rgba(192, 57, 43, 0.15);
          --border-hover: rgba(231, 76, 60, 0.5);
          --text: #f0ece8;
          --text-muted: #6b6560;
          --text-sub: #9a9490;
        }

        .blogs-root {
          min-height: 100vh;
          background-color: var(--black);
          font-family: 'DM Sans', sans-serif;
          color: var(--text);
          position: relative;
          overflow-x: hidden;
        }

        /* Subtle noise texture overlay */
        .blogs-root::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
          opacity: 0.4;
        }

        /* Radial glow from top left */
        .blogs-root::after {
          content: '';
          position: fixed;
          top: -200px;
          left: -200px;
          width: 700px;
          height: 700px;
          background: radial-gradient(circle, rgba(192, 57, 43, 0.08) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .blogs-container {
          position: relative;
          z-index: 1;
          max-width: 900px;
          margin: 0 auto;
          padding: clamp(48px, 10vw, 96px) clamp(20px, 5vw, 48px);
        }

        /* ── HEADER ── */
        .blogs-eyebrow {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
          animation: fadeSlideUp 0.6s ease both;
        }

        .blogs-eyebrow-line {
          width: 32px;
          height: 1px;
          background: var(--red);
        }

        .blogs-eyebrow-text {
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--red-bright);
          font-weight: 500;
        }

        .blogs-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(42px, 8vw, 88px);
          font-weight: 900;
          line-height: 0.92;
          letter-spacing: -0.02em;
          margin: 0 0 16px 0;
          color: var(--text);
          animation: fadeSlideUp 0.6s 0.1s ease both;
        }

        .blogs-title-accent {
          display: block;
          background: linear-gradient(135deg, var(--red-bright) 0%, var(--red-muted) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .blogs-subtitle {
          font-size: 15px;
          color: var(--text-muted);
          font-weight: 300;
          margin: 0 0 64px 0;
          max-width: 480px;
          line-height: 1.7;
          animation: fadeSlideUp 0.6s 0.2s ease both;
        }

        /* Divider */
        .blogs-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(to right, var(--red-muted), transparent);
          margin-bottom: 64px;
          animation: scaleX 0.8s 0.3s ease both;
          transform-origin: left;
        }

        /* ── POST CARDS GRID ── */
        .blogs-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          align-items: start;
        }

        .post-card {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 20px;
          padding: clamp(22px, 4vw, 32px);
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 20px;
          overflow: hidden;
          transition: border-color 0.35s ease, transform 0.35s ease, box-shadow 0.35s ease;
          animation: fadeSlideUp 0.5s ease both;
          text-decoration: none;
          color: inherit;
          min-height: 200px;
        }

        /* Blob glow in corner */
        .post-card::before {
          content: '';
          position: absolute;
          top: -60px;
          right: -60px;
          width: 160px;
          height: 160px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(192, 57, 43, 0.18) 0%, transparent 70%);
          pointer-events: none;
          transition: opacity 0.35s ease, transform 0.35s ease;
          opacity: 0;
          transform: scale(0.8);
        }

        .post-card:hover::before {
          opacity: 1;
          transform: scale(1.2);
        }

        /* Bottom red line sweep */
        .post-card::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0%;
          height: 2px;
          background: linear-gradient(to right, var(--red), var(--red-bright));
          border-radius: 0 0 20px 20px;
          transition: width 0.4s ease;
        }

        .post-card:hover::after {
          width: 100%;
        }

        .post-card:hover {
          border-color: var(--border-hover);
          transform: translateY(-5px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(192, 57, 43, 0.08);
        }

        .post-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 8px;
        }

        .post-date {
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--red-bright);
          font-weight: 500;
          opacity: 0.85;
        }

        .post-tag {
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-muted);
          border: 1px solid rgba(255,255,255,0.07);
          padding: 3px 9px;
          border-radius: 999px;
          background: rgba(255,255,255,0.03);
        }

        .post-number {
          font-family: 'Playfair Display', serif;
          font-size: 13px;
          font-weight: 700;
          color: var(--red-muted);
          opacity: 0.5;
          transition: opacity 0.3s;
        }

        .post-card:hover .post-number {
          opacity: 1;
          color: var(--red);
        }

        .post-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(16px, 2.2vw, 21px);
          font-weight: 700;
          line-height: 1.35;
          color: var(--text);
          transition: color 0.3s ease;
          margin: 0;
          flex: 1;
        }

        .post-card:hover .post-title {
          color: #fff;
        }

        .post-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 16px;
          border-top: 1px solid rgba(255,255,255,0.05);
        }

        .post-read-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-muted);
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .post-card:hover .post-read-btn {
          color: var(--red-bright);
        }

        .post-read-arrow {
          display: inline-block;
          transition: transform 0.3s ease;
        }

        .post-card:hover .post-read-arrow {
          transform: translateX(4px);
        }

        .post-read-icon {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 1px solid rgba(192,57,43,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          color: var(--red-muted);
          transition: background 0.3s, border-color 0.3s, color 0.3s;
          flex-shrink: 0;
        }

        .post-card:hover .post-read-icon {
          background: var(--red);
          border-color: var(--red);
          color: #fff;
        }

        /* ── EMPTY STATE ── */
        .blogs-empty {
          text-align: center;
          padding: 80px 24px;
          border: 1px dashed rgba(192, 57, 43, 0.2);
          border-radius: 4px;
          animation: fadeSlideUp 0.6s ease both;
        }

        .blogs-empty-icon {
          font-size: 48px;
          margin-bottom: 16px;
          opacity: 0.3;
        }

        .blogs-empty-title {
          font-family: 'Playfair Display', serif;
          font-size: 24px;
          color: var(--text-sub);
          margin-bottom: 8px;
        }

        .blogs-empty-sub {
          font-size: 14px;
          color: var(--text-muted);
        }

        /* ── FOOTER LINE ── */
        .blogs-footer {
          margin-top: 80px;
          padding-top: 32px;
          border-top: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          animation: fadeSlideUp 0.6s 0.5s ease both;
        }

        .blogs-footer-count {
          font-size: 12px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-muted);
        }

        .blogs-footer-count span {
          color: var(--red-bright);
          font-weight: 600;
        }

        /* ── ANIMATIONS ── */
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes scaleX {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }

        /* Stagger each card */
        .post-card:nth-child(1)  { animation-delay: 0.30s; }
        .post-card:nth-child(2)  { animation-delay: 0.38s; }
        .post-card:nth-child(3)  { animation-delay: 0.46s; }
        .post-card:nth-child(4)  { animation-delay: 0.54s; }
        .post-card:nth-child(5)  { animation-delay: 0.62s; }
        .post-card:nth-child(6)  { animation-delay: 0.70s; }
        .post-card:nth-child(7)  { animation-delay: 0.78s; }
        .post-card:nth-child(8)  { animation-delay: 0.86s; }

        /* ── RESPONSIVE ── */
        @media (max-width: 640px) {
          .blogs-grid {
            grid-template-columns: 1fr;
          }

          .blogs-footer {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>

            <div className="blogs-root">
                <div className="blogs-container">

                    {/* ── Header ── */}
                    <div className="blogs-eyebrow">
                        <div className="blogs-eyebrow-line" />
                        <span className="blogs-eyebrow-text">Editorial</span>
                    </div>

                    <h1 className="blogs-title">
                        Latest
                        <span className="blogs-title-accent">Insights.</span>
                    </h1>

                    <p className="blogs-subtitle">
                        Thoughts, perspectives and stories worth reading.
                    </p>

                    <div className="blogs-divider" />

                    {/* ── Grid ── */}
                    <div className="blogs-grid">
                        {posts.length > 0 ? (
                            posts.map((post: any, i: number) => (
                                <Link
                                    key={post.id}
                                    href={post.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="post-card"
                                >
                                    {/* Meta row */}
                                    <div className="post-meta">
                                        <span className="post-date">
                                            {new Date(post.published).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                            })}
                                        </span>
                                        <span className="post-number">{String(i + 1).padStart(2, '0')}</span>
                                    </div>

                                    {/* Title */}
                                    <h2 className="post-title">{post.title}</h2>

                                    {/* Footer */}
                                    <div className="post-footer">
                                        <span className="post-read-btn">
                                            Read on Blogger
                                            <span className="post-read-arrow">→</span>
                                        </span>
                                        <div className="post-read-icon">↗</div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="blogs-empty">
                                <div className="blogs-empty-icon">✦</div>
                                <p className="blogs-empty-title">Nothing here yet.</p>
                                <p className="blogs-empty-sub">Start writing on Blogger and your posts will appear here.</p>
                            </div>
                        )}
                    </div>

                    {/* ── Footer ── */}
                    {posts.length > 0 && (
                        <div className="blogs-footer">
                            <span className="blogs-footer-count">
                                <span>{posts.length}</span> {posts.length === 1 ? 'post' : 'posts'} published
                            </span>
                            <span className="blogs-footer-count" style={{ opacity: 0.4 }}>
                                Updated every hour
                            </span>
                        </div>
                    )}

                </div>
            </div>
        </>
    );
}