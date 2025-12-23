import { MantineProvider, Container, Title, Stack } from "@mantine/core";
import { DoubleClickEditable } from "./components/DoubleClickEditable";

// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";
import "./App.css";

function App() {
  return (
    <MantineProvider>
      <Container size="sm" py="xl">
        <Stack gap="md">
          <Title order={2}>Editable Components</Title>
          <DoubleClickEditable
            onSave={(content) => console.log("Saved content:", content)}
          >
            Double-click here to edit this text directly.
          </DoubleClickEditable>
        </Stack>
      </Container>
    </MantineProvider>
  );
}

export default App;
