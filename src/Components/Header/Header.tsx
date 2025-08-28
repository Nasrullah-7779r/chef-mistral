import chefLogo from "../../assets/chef-claude-icon.png"

export default function Header() {
  return (
    <header>
      <img src={chefLogo} alt="Chef" />
      <h1>Chef Mistral</h1>
    </header>
  )
}
