import React from "react"

export function IngredientsList(props: any, ref: React.Ref<HTMLDivElement>) {
  const ingredientsListItems = props.ingredients.map((ingredient: any) => (
    <li key={ingredient}>{ingredient}</li>
  ))
  return (
    <section>
      <h2 className="on-hand">Ingredients on hand:</h2>
      <ul className="ingredients-list" aria-live="polite">
        {ingredientsListItems}
      </ul>
      {props.ingredients.length > 3 && (
        <div className="get-recipe-container">
          <div ref={ref}>
            <h3>Ready for a recipe?</h3>
            <p>Generate a recipe from your list of ingredients.</p>
          </div>
          <button onClick={props.getRecipe}>Get a recipe</button>
        </div>
      )}
    </section>
  )
}

export default React.forwardRef(IngredientsList)
