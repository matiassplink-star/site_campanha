import { z } from "zod";

/** Schema de validação do formulário de contato */
export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome muito longo"),
  email: z
    .string()
    .email("E-mail inválido")
    .optional()
    .or(z.literal("")),
  phone: z
    .string()
    .min(10, "Telefone inválido")
    .max(20, "Telefone inválido")
    .regex(/^[\d\s\(\)\-\+]+$/, "Telefone inválido"),
  city: z.string().max(100, "Cidade muito longa").optional().or(z.literal("")),
  message: z
    .string()
    .min(10, "Mensagem deve ter pelo menos 10 caracteres")
    .max(2000, "Mensagem muito longa"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

/** Schema de validação de post */
export const postSchema = z.object({
  title: z.string().min(3, "Título muito curto").max(200, "Título muito longo"),
  slug: z.string().min(3, "Slug muito curto").max(200, "Slug muito longo"),
  excerpt: z.string().max(500, "Resumo muito longo").optional().or(z.literal("")),
  content: z.string().min(10, "Conteúdo muito curto"),
  cover_image: z.string().url("URL inválida").optional().or(z.literal("")),
  category_id: z.string().uuid("Categoria inválida").optional().or(z.literal("")),
  status: z.enum(["draft", "published", "scheduled", "archived"]),
  meta_title: z.string().max(70, "Meta title muito longo").optional().or(z.literal("")),
  meta_description: z
    .string()
    .max(160, "Meta description muito longa")
    .optional()
    .or(z.literal("")),
  keywords: z.string().optional().or(z.literal("")),
  featured: z.boolean().optional(),
});

export type PostFormData = z.infer<typeof postSchema>;

/** Schema de validação de categoria */
export const categorySchema = z.object({
  name: z.string().min(2, "Nome muito curto").max(100, "Nome muito longo"),
  slug: z.string().min(2, "Slug muito curto").max(100, "Slug muito longo"),
  description: z.string().max(500, "Descrição muito longa").optional().or(z.literal("")),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Cor inválida"),
});

export type CategoryFormData = z.infer<typeof categorySchema>;

/** Schema de validação de configurações */
export const settingsSchema = z.object({
  site_name: z.string().min(2, "Nome muito curto"),
  site_description: z.string().max(500, "Descrição muito longa").optional(),
  whatsapp_number: z
    .string()
    .regex(/^\d{10,15}$/, "Número inválido (apenas dígitos, 10-15 chars)"),
  whatsapp_message: z.string().max(500, "Mensagem muito longa"),
  instagram_url: z.string().url("URL inválida").optional().or(z.literal("")),
  facebook_url: z.string().url("URL inválida").optional().or(z.literal("")),
  youtube_url: z.string().url("URL inválida").optional().or(z.literal("")),
  site_email: z.string().email("E-mail inválido").optional().or(z.literal("")),
  site_phone: z.string().max(20).optional().or(z.literal("")),
  site_address: z.string().max(300).optional().or(z.literal("")),
});

export type SettingsFormData = z.infer<typeof settingsSchema>;
