type MyMemoryResponse = {
  responseStatus: number;
  responseDetails: string;
  responseData: {
    translatedText: string;
  };
};

/** 英語テキストを日本語に翻訳（学習用: MyMemory 無料 API・1日あたりの上限あり） */
export async function translateEnToJa(text: string): Promise<string> {
  const url = new URL('https://api.mymemory.translated.net/get');
  url.searchParams.set('q', text);
  url.searchParams.set('langpair', 'en|ja');

  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error(`翻訳 API: HTTP ${res.status}`);
  }

  const data = (await res.json()) as MyMemoryResponse;
  if (data.responseStatus !== 200) {
    throw new Error(data.responseDetails || '翻訳に失敗しました');
  }

  return data.responseData.translatedText;
}
