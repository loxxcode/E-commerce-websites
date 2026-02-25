import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "..", "server", "stores.json");

function ensureFile() {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "[]");
  }
}

function readStores() {
  ensureFile();
  const content = fs.readFileSync(filePath, "utf8");
  try {
    return JSON.parse(content || "[]");
  } catch (e) {
    return [];
  }
}

function writeStores(data: any) {
  ensureFile();
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export async function GET() {
  const stores = readStores();
  return NextResponse.json({ data: stores });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, user_id } = body;
    if (!name || typeof name !== "string") {
      return NextResponse.json({ message: "Name is required" }, { status: 400 });
    }

    const stores = readStores();
    const id = stores.length ? Math.max(...stores.map((s: any) => s.id || 0)) + 1 : 1;
    const newStore = { id, name, user_id: user_id ?? 1 };
    stores.push(newStore);
    writeStores(stores);

    return NextResponse.json({ message: "Store created", data: newStore }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }
}
