export async function getRecipeFromMistral(ingredientsArr: string[]) {
  if (ingredientsArr.length === 0) {
    return ""
  }

  const API_BASE = '/api/v1/'
  try {
    const response = await fetch(API_BASE + "recipe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredients: ingredientsArr
          .map((ingredient) => ingredient.trim())
          .filter(Boolean),
      }),
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()

    return data.recipe
  } catch (err: any) {
    console.error(err.message)
  }
}
