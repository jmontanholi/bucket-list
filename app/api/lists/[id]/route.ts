// app/api/lists/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { updateList } from "@/app/(controllers)/lists";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const listId = parseInt(params.id);
  const body = await request.json();
  const updatedList = body.updatedList;

  const result = await updateList(listId, updatedList);

  return NextResponse.json(result);
}
