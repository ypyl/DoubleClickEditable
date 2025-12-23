import { useState } from "react";
import { MantineProvider, Container, Title, Stack } from "@mantine/core";
import { DoubleClickEditable } from "./components/DoubleClickEditable";

// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";
import "./App.css";

function App() {
  const [content, setContent] = useState("Double-click here to edit this text directly.");

  return (
    <MantineProvider>
      <Container size="sm" py="xl">
        <Stack gap="md">
          <Title order={2}>Editable Components</Title>
          <DoubleClickEditable
            onSave={(newContent) => {
              console.log("Saved content:", newContent);
              setContent(newContent);
            }}
          >
            {content}
          </DoubleClickEditable>
        </Stack>
      </Container>
    </MantineProvider>
  );
}

export default App;
