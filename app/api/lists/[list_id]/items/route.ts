// app/api/lists/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createItem, getItems } from "@/app/(controllers)/items";

export async function GET(
  request: NextRequest,
  { params }: { params: { list_id: string } }
) {
  const listId = parseInt(params.list_id);

  const result = await getItems(listId);

  return NextResponse.json(result);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const item = body.item;

  const result = await createItem(item);

  return NextResponse.json(result);
}
