import getDatabase from "../../data/mongodb";

export const dynamic = "force-dynamic";

export const GET = async (request) => {
  const keepAliveSecret = process.env.CRON_SECRET;
  const authorization = request.headers.get("authorization");

  if (!keepAliveSecret) {
    return Response.json({ status: "not configured" }, { status: 503 });
  }

  if (authorization !== `Bearer ${keepAliveSecret}`) {
    return Response.json({ status: "unauthorized" }, { status: 401 });
  }

  try {
    const database = await getDatabase();

    if (!database) {
      return Response.json({ status: "unavailable" }, { status: 503 });
    }

    await database.command({ ping: 1 });
    return Response.json({ status: "ok" });
  } catch {
    return Response.json({ status: "unavailable" }, { status: 503 });
  }
};
