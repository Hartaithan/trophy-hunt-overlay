import "@mantine/core/styles.css";
import type { FC } from "react";
import { MantineProvider } from "@mantine/core";
import { theme } from "./styles/theme";

const App: FC = () => {
  return <div>Hello World!</div>;
};

const Wrapper: FC = () => {
  return (
    <MantineProvider defaultColorScheme="dark" theme={theme}>
      <App />
    </MantineProvider>
  );
};

export default Wrapper;
