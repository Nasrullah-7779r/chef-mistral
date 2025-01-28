import { useState } from "react"
import IngredientsList from "./IngredientList"
import ClaudeRecipe from "./ClaudeRecipe"
import { getRecipeFromMistral } from "../ai"
import { Loader } from "./Loader"

export default function Main() {
  type Ingredient = string

  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  // const [recipeShown, setRecipeShown] = useState(false)
  const [loading, setLoading] = useState(false)
  const [recipe, setRecipe] = useState("")

  async function getRecipe() {
    setLoading(true)
    const recipeMarkdown = await getRecipeFromMistral(ingredients)
    setLoading(false)
    console.log("recipeMarkdown", recipeMarkdown)
    setRecipe(recipeMarkdown as string)
  }

  function addIngredient(event: any) {
    event.preventDefault()
    const formData = new FormData(event.target)
    const newIngredient = formData.get("ingredient") as string

    event.currentTarget.reset()
    setIngredients((prevIngredients) => [...prevIngredients, newIngredient])
  }

  // function toggleRecipeShown() {
  //   setRecipeShown((prevShown) => !prevShown)
  // }

  return (
    <main>
      <form className="add-ingredient-form" onSubmit={addIngredient}>
        <input
          type="text"
          placeholder="e.g. oregano"
          aria-label="Add ingredient"
          name="ingredient"
          required
        />
        <button>Add ingredient</button>
      </form>

      {ingredients.length > 0 && (
        <IngredientsList ingredients={ingredients} getRecipe={getRecipe} />
      )}
      {loading && <Loader />}
      {recipe != "" && <ClaudeRecipe recipe={recipe} />}
    </main>
  )
}
