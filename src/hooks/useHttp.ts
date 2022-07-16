export const useHttp = () => {
  const request = async (
    url: string,
    method = 'GET',
    body = null,
    headers = {'Content-Type': 'application/json'}
  ) => {

    try {
      const response = await fetch(url, {method, body, headers});

      if (!response.ok) {
        return new Error(`Could not fetch ${url}, status: ${response.status}`);
      }

      return await response.json();
    } catch (e) {
      throw e;
    }
  }

  return {request}
}
