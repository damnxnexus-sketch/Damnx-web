import Link from 'next/link';

export default async function BlogsPage() {
    // Your exact credentials
    const API_KEY = "AIzaSyDn5cj05lYmGwIr-Sf8VJcqlOWGRv1Wtv0";
    const BLOG_ID = "2979434833167806285";

    // Fetching posts from Blogger
    let posts = [];
    try {
        const res = await fetch(
            `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}`,
            { next: { revalidate: 3600 } } // Re-fetches new blogs every 1 hour
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
        <div className="min-h-screen bg-black text-white py-16 px-6 font-sans">
            <div className="max-w-4xl mx-auto">

                {/* Sleek Header */}
                <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400 mb-12 border-b border-red-900 pb-4">
                    Latest Insights
                </h1>

                {/* Blog Grid */}
                <div className="grid gap-8">
                    {posts.length > 0 ? (
                        posts.map((post: any) => (
                            <article
                                key={post.id}
                                className="bg-neutral-900 border border-neutral-800 hover:border-red-600 transition-colors duration-300 p-8 rounded-lg shadow-lg group"
                            >
                                <h2 className="text-2xl font-bold text-white group-hover:text-red-500 transition-colors mb-3">
                                    {post.title}
                                </h2>

                                {/* Publish Date */}
                                <p className="text-sm text-red-400 mb-4 font-mono">
                                    {new Date(post.published).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>

                                {/* Read More Button */}
                                <Link
                                    href={post.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block mt-4 px-6 py-2 border border-red-600 text-red-500 hover:bg-red-600 hover:text-black font-semibold rounded transition-all"
                                >
                                    Read on Blogger →
                                </Link>
                            </article>
                        ))
                    ) : (
                        <p className="text-gray-400 text-lg">No blogs found. Start writing on Blogger to see them appear here!</p>
                    )}
                </div>
            </div>
        </div>
    );
}