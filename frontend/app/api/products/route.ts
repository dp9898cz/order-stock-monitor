export async function GET() {
    const res = await fetch("http://backend:5000/getProducts", { cache: "no-cache" });
    const data = await res.json();

    return Response.json({ data });
}

export const dynamic = "force-dynamic";
