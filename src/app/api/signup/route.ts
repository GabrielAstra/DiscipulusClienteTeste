import { signup } from "@/lib/service/auth/auth.service";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const response = await signup(body);

  console.log(response);
}
