/** @type {import('next').NextConfig} */
const supabaseUrl = process.env.SUPABASE_URL;

const nextConfig = {
  images: {
    remotePatterns: supabaseUrl
      ? [
          {
            protocol: "https",
            hostname: new URL(supabaseUrl).hostname,
            pathname: "/storage/v1/object/public/**"
          }
        ]
      : []
  }
};

export default nextConfig;
