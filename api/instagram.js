
export default async function handler(req, res) {
  try {
    const token = process.env.INSTAGRAM_ACCESS_TOKEN;
    const instagramId = process.env.INSTAGRAM_ACCOUNT_ID;
    const apiVersion = process.env.META_API_VERSION;

    if (!token || !instagramId || !apiVersion) {
      return res.status(500).json({
        error: "Variáveis do Instagram não configuradas."
      });
    }

    const url = new URL(
      `https://graph.facebook.com/${apiVersion}/${instagramId}/media`
    );

    url.searchParams.set(
      "fields",
      "id,caption,media_type,media_url,permalink,thumbnail_url,timestamp"
    );

    url.searchParams.set("limit", "6");
    url.searchParams.set("access_token", token);

    const resposta = await fetch(url);
    const dados = await resposta.json();

   if (!resposta.ok) {
  console.error("Erro da API Meta:", dados);

  return res.status(502).json({
    error: "Erro ao buscar publicações do Instagram.",
    detalhes: dados.error
  });
}

    return res.status(200).json({
      posts: dados.data || []
    });

  } catch (erro) {
    console.error("Erro ao carregar Instagram:", erro);

    return res.status(500).json({
      error: "Erro interno ao carregar Instagram."
    });
  }
}
