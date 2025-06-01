import { Container } from "react-bootstrap";

export default function Homepage() {
  {/*Homepage without information, but pretty display */}
  return (
    <Container>
      <h1 className="my-3">Homepage</h1>
      <p className="my-2">Welcome to Budget Tracker:</p>
      <ul>
        <li>IF you haven't register, please login to view the feature</li>
        <li>Caution: Is a simple function, that utilize bootstrap and useState</li>
      </ul>
    </Container>
  )
}