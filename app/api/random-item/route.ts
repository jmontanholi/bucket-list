// app/api/lists/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const response = await fetch("https://api.api-ninjas.com/v1/bucketlist", {
      method: "GET",
      headers: {
        "X-Api-Key": process.env.NINJA_API_KEY!,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const { item: randomIdea } = await response.json();

    return NextResponse.json(randomIdea);
  } catch (err) {
    console.log(err);
    return NextResponse.json(err);
  }
}
