// app/api/lists/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { updateItem, deleteItem } from "@/app/(controllers)/items";

export async function POST(
  request: NextRequest,
  { params }: { params: { item_id: string } }
) {
  const itemId = parseInt(params.item_id);
  const body = await request.json();
  const updatedItem = body.updatedItem;

  const result = await updateItem(itemId, updatedItem);

  return NextResponse.json(result);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { item_id: string } }
) {
  const itemId = parseInt(params.item_id);

  const result = await deleteItem(itemId);

  return NextResponse.json(result);
}
