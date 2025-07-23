export interface ICreatePaymentPayload {
  amount: number;
  description: string;
  customer_name: string;
  customer_cpf: string;
  customer_email: string;
  customer_phone: string;
  customer_address: string;
  webhook_url: string;
  external_id: string;
}

export interface ICreatePaymentResponse {
  success: boolean;
  data:
    | {
        payment_id: string;
        external_id: string;
        amount: number;
        status: string;
        qr_code: string;
        qr_image_url: string;
        expires_at: Date;
        created_at: Date;
      }
    | undefined;
  error: string | undefined;
  message: string | undefined;
  current_limit: number | undefined;
  amount_requested: number | undefined;
}

export async function criarLinkPagamento(
  payload: ICreatePaymentPayload
): Promise<ICreatePaymentResponse> {
  const resposta = await fetch("https://pixgo.org/api/v1/payment/create", {
    method: "POST",
    headers: {
      "X-API-Key": "",
    },
    body: JSON.stringify(payload),
  });

  if (!(resposta.status == 201)) {
    const erro = await resposta.json();
    throw new Error(erro.message || "Erro ao criar pagamento");
  }

  return await resposta.json();
}

export interface IPaymentResponse {
  success: boolean;
  data:
    | {
        payment_id: string;
        external_id: string;
        amount: number;
        status: string;
        customer_name: string;
        customer_cpf: string;
        customer_phone: string;
        customer_address: string;
        description: string;
        qr_code: string;
        qr_image_url: string;
        webhook_url: string;
        created_at: Date;
        updated_at: Date;
        expires_at: Date;
      }
    | undefined;
}

export async function buscarPagamentoPorId(
  id: string
): Promise<IPaymentResponse> {
  const url = `https://pixgo.org/api/v1/payment/${id}`;
  const resposta = await fetch(url, {
    method: "GET",
    headers: {
      "X-API-Key": "",
    },
  });

  if (!(resposta.status == 201)) {
    const erro = await resposta.json();
    throw new Error(erro.message || "Erro ao buscar pagamento");
  }

  return await resposta.json();
}
