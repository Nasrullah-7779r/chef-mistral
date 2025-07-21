export async function getRecipeFromMistral(ingredientsArr: string[]) {
  if (ingredientsArr.length === 0) {
    return ""
  }

  try {
    const response = await fetch(import.meta.env.VITE_API_BASE_URL + "recipe", {
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
