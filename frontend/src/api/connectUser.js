export async function connectUser(payload) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/login`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(payload),
      headers: {
        'Content-type': 'application/json'
      }
    })
  
    if (!response.ok) {
      const errorDetails = await response.json()
      throw new Error(`${response.status} ${response.statusText} (${response.type}) : ${errorDetails.message}`);
    }
  
    return await response.json()
  }