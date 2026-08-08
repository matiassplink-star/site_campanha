import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { apoiadorSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validação com Zod
    const result = apoiadorSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Dados inválidos", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const {
      name,
      email,
      phone,
      city,
      neighborhood,
      how_help,
      lgpd_consent,
      whatsapp_authorization,
    } = result.data;

    // Pega IP do cliente
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0] : "unknown";

    const supabase = await createClient();

    const { error } = await supabase.from("apoiadores").insert({
      name,
      email: email || null,
      phone,
      city,
      neighborhood: neighborhood || null,
      how_help: how_help || null,
      lgpd_consent,
      whatsapp_authorization,
      ip_address: ip,
    });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Erro ao salvar cadastro" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Cadastro realizado com sucesso!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Apoiador API error:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
