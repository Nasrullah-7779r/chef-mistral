import { useEffect, useRef, useState } from "react"
import IngredientsList from "./IngredientList"
import ClaudeRecipe from "./ClaudeRecipe"
import { getRecipeFromMistral } from "../ai"
import { Loader } from "./Loader"

export default function Main() {
  type Ingredient = string

  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [loading, setLoading] = useState(false)
  const [recipe, setRecipe] = useState("")

  const recipeRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (recipe !== "" && recipeRef.current !== null) {
      recipeRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [recipe])

  async function getRecipe() {
    setLoading(true)
    const recipeMarkdown = await getRecipeFromMistral(ingredients)
    setLoading(false)
    setRecipe(recipeMarkdown as string)
  }

  function addIngredient(event: any) {
    event.preventDefault()
    const formData = new FormData(event.target)
    const newIngredient = formData.get("ingredient") as string

    event.currentTarget.reset()
    const inputElement = event.target.elements["ingredient"]
    inputElement.focus()
    setIngredients((prevIngredients) => [...prevIngredients, newIngredient])
  }

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
        <IngredientsList
          ref={recipeRef}
          ingredients={ingredients}
          getRecipe={getRecipe}
        />
      )}
      {loading && <Loader />}
      {recipe != "" && <ClaudeRecipe recipe={recipe} />}
    </main>
  )
}
