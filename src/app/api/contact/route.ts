import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { contactSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validação com Zod
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Dados inválidos", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, phone, city, message } = result.data;

    // Pega IP do cliente
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0] : "unknown";

    const supabase = await createClient();

    const { error } = await supabase.from("contacts").insert({
      name,
      email: email || null,
      phone,
      city: city || "",
      message,
      ip_address: ip,
    });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Erro ao salvar mensagem" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Mensagem enviada com sucesso!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
